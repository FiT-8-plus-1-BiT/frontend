import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function AudienceStreaming() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const token = useSelector((state) => state.auth.token);
  const [stompClient, setStompClient] = useState(null);

  const pcRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const pendingCandidates = useRef([]); // 💡 ICE 후보 저장용 큐

  // STOMP 연결
  useEffect(() => {
    if (!sessionId || !token) return;

    const client = new Client({
      brokerURL: '',
      webSocketFactory: () => new SockJS('https://fit-conf.shop/ws'),
      connectHeaders: {
        Authorization: `Bearer ${token}`, // ✅ Bearer 포함 필수
      },
      onConnect: () => {
        console.log(`✅ STOMP 연결됨: sessionId=${sessionId}`);
        setStompClient(client);

        // ✅ SDP Answer 수신
        client.subscribe(
          `/sub/room/${sessionId}/audience/answer`,
          (message) => {
            const sdpAnswer = message.body;
            if (pcRef.current) {
              pcRef.current
                .setRemoteDescription({ type: 'answer', sdp: sdpAnswer })
                .then(() => {
                  console.log('✅ SDP setRemoteDescription 성공');

                  // ICE 후보 처리
                  pendingCandidates.current.forEach((candidate) => {
                    pcRef.current
                      .addIceCandidate(candidate)
                      .then(() => console.log('✅ 대기 중 ICE 추가됨'))
                      .catch((err) => console.error('❗ ICE 추가 실패', err));
                  });
                  pendingCandidates.current = [];
                })
                .catch((err) =>
                  console.error('❗ setRemoteDescription 실패', err),
                );
            }
          },
          { Authorization: `Bearer ${token}` },
        );

        // ✅ ICE 수신
        client.subscribe(
          `/sub/room/${sessionId}/audience/iceCandidate`,
          (message) => {
            const candidateDto = JSON.parse(message.body);
            const candidate = new RTCIceCandidate(candidateDto);
            if (pcRef.current) {
              if (
                pcRef.current.remoteDescription &&
                pcRef.current.remoteDescription.type
              ) {
                pcRef.current
                  .addIceCandidate(candidate)
                  .then(() => console.log('✅ ICE 추가됨'))
                  .catch((err) => console.error('❗ ICE 추가 실패', err));
              } else {
                console.warn('⏳ SDP 미설정 → ICE 후보 보류');
                pendingCandidates.current.push(candidate);
              }
            }
          },
          { Authorization: `Bearer ${token}` },
        );
      },
      onStompError: (frame) => {
        console.error('❗ STOMP 오류:', frame.headers['message']);
      },
      onWebSocketClose: () => {
        console.warn('❗ WebSocket 연결 종료됨');
      },
    });

    client.activate();
  }, [sessionId, token]);

  // 오디오 수신 시작
  const startAudience = async () => {
    if (!stompClient || !sessionId)
      return alert('STOMP 연결 또는 세션 ID 없음');

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
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }
    };

    pc.ontrack = (event) => {
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = event.streams[0];
        remoteAudioRef.current.play().catch((err) => {
          console.warn('브라우저 자동재생 차단:', err);
        });
      }
    };

    pc.addTransceiver('audio', { direction: 'recvonly' });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    stompClient.publish({
      destination: `/pub/room/${sessionId}/audience`,
      body: offer.sdp,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const leaveAudience = () => {
    if (!stompClient || !sessionId) {
      alert('STOMP 연결 또는 세션 ID 없음');
      return;
    }

    stompClient.publish({
      destination: `/pub/room/${sessionId}/audience/leave`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }

    if (remoteAudioRef.current?.srcObject) {
      remoteAudioRef.current.srcObject
        .getTracks()
        .forEach((track) => track.stop());
      remoteAudioRef.current.srcObject = null;
    }

    console.log('👋 청중 나감');
  };

  return (
    <div className="p-6 bg-white rounded border shadow">
      <h2 className="text-xl font-bold mb-3">🎧 Audience Streaming</h2>
      <p className="text-sm mb-2">Session ID: {sessionId}</p>

      <button
        onClick={startAudience}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
      >
        Start Listening
      </button>
      <WaveBars />
      <button
        onClick={leaveAudience}
        className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
      >
        Leave
      </button>

      <audio ref={remoteAudioRef} autoPlay controls className="mt-4 w-full" />
    </div>
  );
}

export default AudienceStreaming;
function WaveBars() {
  return (
    <div className="flex gap-1 items-end h-20">
      {Array.from({ length: 20 }).map((_, i) => {
        const initialScale = (0.4 + Math.random() * 0.6).toFixed(2); // 0.4 ~ 1.0
        return (
          <div
            key={i}
            className="w-2 h-16 bg-blue-700 rounded  animate-wave"
            style={{
              '--start-scale': initialScale,
            }}
          />
        );
      })}
    </div>
  );
}
