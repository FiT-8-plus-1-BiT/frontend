import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LiveSessionItem } from '~/components/session-list/live-session-item';
import { useLiveSessionsWithSchedule } from '~/hooks/session/use-live-sessions-with-schedule';
import { createCongestionStompClient } from '~/api/congestion/congestion-stomp-client';
import { SkeletonLiveSessionList } from '~/components/session-list/skeleton-live-session-list';

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

  // liveSessions 업데이트 시, 새 세션에 대한 기본 혼잡도를 설정합니다.
  useEffect(() => {
    if (!token || liveSessions.length === 0) return;
    setCongestionMap((prev) => {
      const newMap = { ...prev };
      liveSessions.forEach((session) => {
        // 기존에 없는 세션에 대해서만 기본값('적정') 추가
        if (newMap[session.id] === undefined) {
          newMap[session.id] = '적정';
        }
      });
      return newMap;
    });
  }, [liveSessions, token]);

  // STOMP 구독 설정: 새 데이터가 들어올 때마다 setCongestionMap이 호출됩니다.
  useEffect(() => {
    if (!token) return;

    const client = createCongestionStompClient(token, (data) => {
      // data 객체 자체가 혼잡도 정보를 담고 있으므로, data.congestionLevel 체크는 필요없습니다.
      setCongestionMap((prev) => {
        const newMap = { ...prev };
        Object.entries(data).forEach(([sessionId, congestion]) => {
          newMap[sessionId] = congestion.level; // 새로운 혼잡도 level로 업데이트
        });
        return newMap;
      });
    });

    return () => {
      console.log('🛑 혼잡도 STOMP 연결 해제');
      client.deactivate();
    };
  }, [token]);

  // (선택 사항) congestionMap 업데이트 시 추가 작업이 필요한 경우 useEffect로 처리
  useEffect(() => {
    console.log('Congestion map updated:', congestionMap);
  }, [congestionMap]);

  if (liveLoading) return <SkeletonLiveSessionList />;

  return (
    <>
      <h2 className="text-[2vw] font-bold mb-4">현재 라이브 중인 세션</h2>
      {liveSessions.length === 0 ? (
        <div className="text-center text-gray-500 text-lg">
          현재 진행 중인 세션이 없습니다.
        </div>
      ) : (
        <div className="grid justify-item-center xl:grid-cols-3 grid-cols-2 gap-8 mb-12">
          {liveSessions.map((session) => (
            <LiveSessionItem
              key={session.id}
              sessionId={session.id}
              title={session.title}
              thumbnail={session.speaker.image}
              speaker={session.speaker}
              description={session.summary}
              tags={Object.values(session.tags)}
              isScheduled={session.isMySession}
              congestion={congestionMap[session.id]} // 혼잡도 전달
              onToggleSchedule={handleToggleSchedule}
              onClick={() => handleSessionClick(session.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}
