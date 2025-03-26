import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiveSessionItem } from '~/components/session-list/live-session-item';
import { useLiveSessionsWithSchedule } from '~/hooks/session/use-live-sessions-with-schedule';
import { createStompClient } from '~/api/chat/stomp-client';

export default function LiveSessionList({ token }) {
  const navigate = useNavigate();
  const [congestionMap, setCongestionMap] = useState({}); // 혼잡도 저장

  const {
    sessions: liveSessions,
    loading: liveLoading,
    error: liveError,
    toggleSchedule: toggleLiveSchedule,
  } = useLiveSessionsWithSchedule(token);

  const handleSessionClick = (id) => {
    navigate(`/streaming?session_id=${id}`);
  };

  const handleToggleSchedule = async (sessionId) => {
    if (!token) {
      window.alert('로그인 후 이용 가능합니다');
      return;
    }

    await toggleLiveSchedule(sessionId);
  };

  // 🧠 혼잡도 구독 로직
  useEffect(() => {
    if (!token) return;

    const client = createStompClient(token);

    client.onConnect = () => {
      console.log('🟢 STOMP 연결됨. 혼잡도 구독 시작');

      // 모든 세션에 대해 구독
      liveSessions.forEach((session) => {
        const topic = `/sub/session`; // 혹은 /sub/session/123 등 실제 백엔드에 따라
        client.subscribe(topic, (message) => {
          const data = JSON.parse(message.body);
          console.log('📩 혼잡도 수신:', data);

          setCongestionMap((prev) => ({
            ...prev,
            [data.sessionId]: data.congestionLevel, // 예: low / medium / high
          }));
        });
      });
    };

    return () => {
      console.log('🛑 STOMP 연결 해제');
      client.deactivate();
    };
  }, [token, liveSessions]);

  if (liveLoading) return <div>라이브 세션 로딩 중...</div>;
  if (liveError) return <div>라이브 세션 에러: {liveError.message || '에러 발생'}</div>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">현재 라이브 중인 세션</h2>
      <div className="grid justify-item-center xl:grid-cols-3 grid-cols-2 gap-8 mb-12">
        {liveSessions.map((session) => (
          <LiveSessionItem
            key={session.id}
            sessionId={session.id}
            title={session.title}
            thumbnail={session.thumbnail}
            speaker={session.speaker}
            description={session.summary}
            tags={Object.values(session.tags)}
            isScheduled={session.isMySession}
            congestion={congestionMap[session.id]} // 💡 혼잡도 전달
            onToggleSchedule={handleToggleSchedule}
            onClick={() => handleSessionClick(session.id)}
          />
        ))}
      </div>
    </>
  );
}
