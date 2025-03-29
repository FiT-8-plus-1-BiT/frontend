// src/components/AudienceStreaming.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AudienceStreaming() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const token = useSelector((state) => state.auth.token); // Redux에서 토큰 가져오기
  const [stompClient, setStompClient] = useState(null);

  const pcRef = useRef(null);
  const remoteAudioRef = useRef(null);

  // STOMP 연결
  useEffect(() => {
    if (!sessionId || !token) return;

    const client = new Client({
      brokerURL: '',
      webSocketFactory: () => new SockJS('https://fit-conf.shop/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`, // ✅ Bearer 포함
      },
      onConnect: () => {
        console.log(`✅ STOMP 연결됨: sessionId=${sessionId}`);

        // SDP Answer 수신
        client.subscribe(`/sub/room/${sessionId}/audience/answer`, (message) => {
          const sdpAnswer = message.body;
          if (pcRef.current) {
            pcRef.current.setRemoteDescription({ type: 'answer', sdp: sdpAnswer })
              .then(() => console.log('✅ setRemoteDescription 성공'))
              .catch(err => console.error('❗ setRemoteDescription 실패', err));
          }
        }, { Authorization: `Bearer ${token}` });

        // ICE Candidate 수신
        client.subscribe(`/sub/room/${sessionId}/audience/iceCandidate`, (message) => {
          const candidateDto = JSON.parse(message.body);
          if (pcRef.current) {
            const candidate = new RTCIceCandidate(candidateDto);
            pcRef.current.addIceCandidate(candidate)
              .then(() => console.log('✅ ICE 추가됨'))
              .catch((err) => console.error('❗ ICE 추가 실패', err));
          }
        }, { Authorization: `Bearer ${token}` });
      },
      onStompError: (frame) => {
        console.error('❗ STOMP 오류:', frame.headers['message']);
      },
      onWebSocketClose: () => {
        console.warn('❗ WebSocket 연결 종료');
      },
    });

    client.activate();
    setStompClient(client);
  }, [sessionId, token]);

  // 오디오 수신 시작
  const startAudience = async () => {
    if (!stompClient || !sessionId) return alert('STOMP 연결 또는 세션 ID가 없습니다.');

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
      if (event.candidate) {
        const candidateDto = {
          candidate: event.candidate.candidate,
          sdpMid: event.candidate.sdpMid,
          sdpMLineIndex: event.candidate.sdpMLineIndex,
        };

        stompClient.publish({
          destination: `/pub/room/${sessionId}/audience/ice`,
          body: JSON.stringify(candidateDto),
          headers: { Authorization: `Bearer ${token}` },
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = event.streams[0];
        remoteAudioRef.current.play().catch(err => {
          console.warn('브라우저 재생 차단:', err);
        });
      }
    };

    pc.addTransceiver('audio', { direction: 'recvonly' });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    stompClient.publish({
      destination: `/pub/room/${sessionId}/audience`,
      body: offer.sdp,
      headers: { Authorization: `Bearer ${token}` },
    });
  };

  return (
    <div className="p-4 border rounded-lg bg-white my-4">
      <h2 className="text-xl font-bold mb-2">🎧 Audience Streaming</h2>
      <p className="text-sm text-gray-600 mb-3">Session ID: {sessionId}</p>
      <button
        onClick={startAudience}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Start Listening
      </button>
      <audio ref={remoteAudioRef} autoPlay controls className="mt-4 w-full" />
    </div>
  );
}

export default AudienceStreaming;
