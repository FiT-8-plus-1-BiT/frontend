import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Play, Pause } from 'lucide-react'; // Pause 아이콘을 사용
import muteButton1 from '/public/assets/muteButton1.svg';
import muteButton2 from '/public/assets/muteButton2.svg';


function AudienceStreaming() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const token = useSelector((state) => state.auth.token);
  const [stompClient, setStompClient] = useState(null);
  const [muted, setMuted] = useState(false); // 음소거 상태 관리
  const [isListening, setIsListening] = useState(false); // 재생 여부 상태 관리

  const pcRef = useRef(null);
  const remoteAudioRef = useRef(null);
  const pendingCandidates = useRef([]); // 💡 ICE 후보 저장용 큐

  // STOMP 연결
  useEffect(() => {
    if (!sessionId || !token) return;

    const client = new Client({
      brokerURL: '',
      webSocketFactory: () => new SockJS('https://fit-conference.shop/ws'),
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
        { urls: import.meta.env.VITE_RTC_STUN_URL },
        {
          urls: import.meta.env.VITE_RTC_TURN_URL,
          username: import.meta.env.VITE_RTC_TURN_USERNAME,
          credential: import.meta.env.VITE_RTC_TURN_CREDENTIAL,
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

    setIsListening(true); // 재생 시작 상태로 변경
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

    setIsListening(false); // 재생 중지 상태로 변경

    console.log('👋 청중 나감');
  };

  // 음소거 토글 함수
  const toggleMute = () => {
    if (remoteAudioRef.current) {
      remoteAudioRef.current.muted = !muted; // 음소거 상태 변경
      setMuted((prev) => !prev); // 상태 업데이트
    }
  };

  return (
    <div className="p-6 mb-6 w-full bg-gray-90 rounded-2xl flex items-center justify-between gap-4">
      {/* Start Listening / Pause 버튼 */}
      <button
        onClick={isListening ? leaveAudience : startAudience}
        className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-blue-700"
      >
        {isListening ? <Pause size={20} /> : <Play size={20} />}
      </button>

      {/* 오디오 스트리밍 애니메이션 */}
      <div className="flex gap-1 h-5 items-end ">
        {[2, 4, 6, 4, 2].map((height, index) => (
          <span
            key={index}
            className={`
        w-1 h-${height} 
        ${isListening ? 'bg-blue-500 animate-wave origin-bottom' : 'bg-gray-500'}
        ${isListening ? `delay-${index * 100}` : ''}
      `}
          ></span>
        ))}
      </div>

      {/* 음소거 버튼 */}
      <button
        onClick={toggleMute}
        className="w-10 h-10 rounded-full flex items-center justify-center"
      >
        <img
          src={muted ? muteButton1 : muteButton2}
          alt={muted ? '음소거됨' : '음소거 아님'}
          className="w-6 h-6"
        />

      </button>

      <audio
        ref={remoteAudioRef}
        autoPlay
        hidden
        controls
        className="mt-4 w-full"
      />
    </div>
  );
}

export default AudienceStreaming;
