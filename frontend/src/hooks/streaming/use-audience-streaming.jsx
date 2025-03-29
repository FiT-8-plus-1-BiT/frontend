// src/hooks/useAudienceStreaming.jsx
import { useRef, useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

export function useAudienceStreaming(roomId, token, enabled) {
  const [stompClient, setStompClient] = useState(null);
  const pcRef = useRef(null);
  const remoteAudioRef = useRef(null);

  // 🛡️ 안전한 publish 함수: WebSocket이 OPEN될 때까지 대기
  const safePublish = async (client, frame) => {
    while (client.webSocket.readyState !== WebSocket.OPEN) {
      await new Promise((res) => setTimeout(res, 50));
    }
    client.publish(frame);
  };

  // STOMP 연결 + 연결 완료 후 startAudience 실행
  useEffect(() => {
    if (!roomId || !token) return;

    const client = new Client({
      webSocketFactory: () => new SockJS('https://fit-conf.shop/ws'),
      connectHeaders: { Authorization: `Bearer ${token}` },
      onConnect: async () => {
        console.log('✅ STOMP 연결 완료 (청중)');
        setStompClient(client);

        // SDP Answer 수신
        client.subscribe(
          `/sub/room/${roomId}/audience/answer`,
          (message) => {
            const sdpAnswer = message.body;
            pcRef.current?.setRemoteDescription({ type: 'answer', sdp: sdpAnswer });
          },
          { Authorization: token }
        );

        // ICE Candidate 수신
        client.subscribe(
          `/sub/room/${roomId}/audience/iceCandidate`,
          (message) => {
            const ice = JSON.parse(message.body);
            pcRef.current?.addIceCandidate(new RTCIceCandidate(ice)).catch(console.error);
          },
          { Authorization: token }
        );

        // WebRTC 스트리밍 시작 (조건 만족 시)
        if (enabled) {
          await startAudience(client);
        }
      },
      onStompError: (frame) => {
        console.error('❗ STOMP 오류:', frame.headers['message']);
      },
      onWebSocketClose: () => {
        console.warn('❗ WebSocket 연결 종료');
      },
    });

    client.activate();
  }, [roomId, token, enabled]);

  // ✅ 오디오 수신 전용 WebRTC 연결
  const startAudience = async (client) => {
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

    // ICE 발생 시 서버로 전송
    pc.onicecandidate = (e) => {
      if (e.candidate) {
        const frame = {
          destination: `/pub/room/${roomId}/audience/ice`,
          body: JSON.stringify({
            candidate: e.candidate.candidate,
            sdpMid: e.candidate.sdpMid,
            sdpMLineIndex: e.candidate.sdpMLineIndex,
          }),
          headers: { Authorization: token },
        };
        safePublish(client, frame);
      }
    };

    // 오디오 수신 설정
    pc.ontrack = (event) => {
      console.log('🎧 원격 오디오 수신');
      if (remoteAudioRef.current) {
        remoteAudioRef.current.srcObject = event.streams[0];
        remoteAudioRef.current.play().catch(console.warn);
      }
    };

    pc.addTransceiver('audio', { direction: 'recvonly' });

    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);

    await safePublish(client, {
      destination: `/pub/room/${roomId}/audience`,
      body: offer.sdp,
      headers: { Authorization: token },
    });
  };

  return { remoteAudioRef };
}
