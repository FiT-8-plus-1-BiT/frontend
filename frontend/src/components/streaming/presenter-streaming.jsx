// src/components/PresenterStreaming.jsx
import React, { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

function PresenterStreaming() {
  const token = useSelector((state) => state.auth.token); // Redux에서 access-token
  const [roomId, setRoomId] = useState('default-room'); // 기본 roomId 설정 (원하면 수정 가능)
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  const pcRef = useRef(null);
  const localAudioRef = useRef(null);

  // STOMP 연결
  useEffect(() => {
    if (!token || !roomId) return;

    const client = new Client({
      webSocketFactory: () => new SockJS('https://fit-conf.shop/ws'),
      connectHeaders: {
        Authorization: token,
      },
      onConnect: () => {
        console.log(`[🎙️ STOMP 연결됨] room=${roomId}`);
        setConnected(true);

        client.subscribe(`/sub/room/${roomId}/presenterAnswer`, (message) => {
          const sdpAnswer = message.body;
          pcRef.current?.setRemoteDescription({ type: 'answer', sdp: sdpAnswer });
        }, { Authorization: token });

        client.subscribe(`/sub/room/${roomId}/presenterIceCandidate`, (message) => {
          const ice = JSON.parse(message.body);
          pcRef.current?.addIceCandidate(new RTCIceCandidate(ice)).catch(console.error);
        }, { Authorization: token });
      },
      onStompError: (frame) => {
        console.error('❗ STOMP 오류:', frame.headers['message']);
      },
    });

    client.activate();
    setStompClient(client);
  }, [roomId, token]);

  // WebRTC 시작
  const startStreaming = async () => {
    if (!stompClient || !connected) return;

    const pc = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
        { urls: 'stun:43.201.28.240:3478' },
        {
          urls: 'turn:43.201.28.240:3478',
          username: 'rtcfit',
          credential: 'rtcfit123!',
        },
      ],
    });

    pcRef.current = pc;

    pc.onicecandidate = (event) => {
      if (event.candidate && stompClient.connected) {
        stompClient.publish({
          destination: `/pub/room/${roomId}/presenterIce`,
          body: JSON.stringify({
            candidate: event.candidate.candidate,
            sdpMid: event.candidate.sdpMid,
            sdpMLineIndex: event.candidate.sdpMLineIndex,
          }),
          headers: { Authorization: token },
        });
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));

    if (localAudioRef.current) {
      localAudioRef.current.srcObject = stream;
    }

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    stompClient.publish({
      destination: `/pub/room/${roomId}/presenter`,
      body: offer.sdp,
      headers: { Authorization: token },
    });
  };

  const stopStreaming = () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    if (localAudioRef.current?.srcObject) {
      localAudioRef.current.srcObject.getTracks().forEach((t) => t.stop());
      localAudioRef.current.srcObject = null;
    }

    if (stompClient?.connected) {
      stompClient.publish({
        destination: `/pub/room/${roomId}/presenter/leave`,
        headers: { Authorization: token },
      });
    }

    console.log('🛑 발표자 종료');
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white my-6">
      <h2 className="text-xl font-bold mb-2">🎙️ Presenter Streaming</h2>

      <div className="flex items-center gap-2 mb-4">
        <input
          className="px-3 py-2 border rounded"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
          placeholder="Room ID"
        />
        <button
          onClick={startStreaming}
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={!connected}
        >
          Start
        </button>
        <button
          onClick={stopStreaming}
          className="px-4 py-2 bg-gray-300 text-black rounded"
        >
          Stop
        </button>
      </div>

      <audio ref={localAudioRef} autoPlay controls className="w-full" />
    </div>
  );
}

export default PresenterStreaming;
