import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useSearchParams } from 'react-router-dom';

function PresenterStreaming() {
  const token = useSelector((state) => state.auth.token);
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get('session_id'); // ✅ 쿼리에서 roomId 추출
  const [connected, setConnected] = useState(false);
  const [stompClient, setStompClient] = useState(null);

  const pcRef = useRef(null);
  const localAudioRef = useRef(null);
  const pendingCandidates = useRef([]);

  // STOMP 연결
  useEffect(() => {
    if (!roomId || !token) return;

    const client = new Client({
      webSocketFactory: () => new SockJS('https://fit-conf.shop/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`,
      },
      onConnect: () => {
        console.log(`[🎙️ STOMP 연결됨] room=${roomId}`);
        setConnected(true);

        // SDP Answer
        client.subscribe(
          `/sub/room/${roomId}/presenterAnswer`,
          (msg) => {
            const sdp = msg.body;
            if (pcRef.current) {
              pcRef.current
                .setRemoteDescription({ type: 'answer', sdp })
                .then(() => {
                  console.log('✅ SDP 설정 완료');
                  pendingCandidates.current.forEach((c) => {
                    pcRef.current.addIceCandidate(c).catch(console.error);
                  });
                  pendingCandidates.current = [];
                })
                .catch(console.error);
            }
          },
          { Authorization: `Bearer ${token}` },
        );

        // ICE Candidate
        client.subscribe(
          `/sub/room/${roomId}/presenterIceCandidate`,
          (msg) => {
            const ice = new RTCIceCandidate(JSON.parse(msg.body));
            if (pcRef.current?.remoteDescription?.type) {
              pcRef.current.addIceCandidate(ice).catch(console.error);
            } else {
              pendingCandidates.current.push(ice);
            }
          },
          { Authorization: `Bearer ${token}` },
        );
      },
      onStompError: (frame) => {
        console.error('❗ STOMP 오류:', frame.headers['message']);
      },
    });

    client.activate();
    setStompClient(client);
  }, [roomId, token]);

  // PeerConnection 초기화 및 시작
  const startStreaming = async () => {
    if (!connected || !stompClient || !roomId) return;

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

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        stompClient.publish({
          destination: `/pub/room/${roomId}/presenterIce`,
          body: JSON.stringify({
            candidate: e.candidate.candidate,
            sdpMid: e.candidate.sdpMid,
            sdpMLineIndex: e.candidate.sdpMLineIndex,
          }),
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    };

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    stream.getTracks().forEach((track) => pc.addTrack(track, stream));
    if (localAudioRef.current) localAudioRef.current.srcObject = stream;

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    stompClient.publish({
      destination: `/pub/room/${roomId}/presenter`,
      body: offer.sdp,
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  const stopStreaming = () => {
    pcRef.current?.close();
    pcRef.current = null;

    localAudioRef.current?.srcObject
      ?.getTracks()
      .forEach((track) => track.stop());
    localAudioRef.current.srcObject = null;

    if (stompClient?.connected) {
      stompClient.publish({
        destination: `/pub/room/${roomId}/presenter/leave`,
        headers: { Authorization: `Bearer ${token}` },
      });
    }

    console.log('🛑 발표자 종료');
  };

  return (
    <div className="p-4 border rounded-lg shadow bg-white my-6">
      <h2 className="text-xl font-bold mb-2">🎙️ Presenter Streaming</h2>

      <p className="text-sm mb-2">Session ID: {roomId}</p>

      <div className="flex items-center gap-2 mb-4">
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
