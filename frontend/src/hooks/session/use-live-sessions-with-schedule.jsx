import { useEffect, useState } from 'react';
import { addToSchedule, removeFromSchedule } from '~/utils/session/schedule';
import { getLiveSessions } from '~/api/session/get-live-session'; // 이 부분만 바뀜

export function useLiveSessionsWithSchedule(token) {
  const [sessions, setSessions] = useState([]); // flat 구조
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 세션 담기/취소 토글
  const toggleSchedule = async (sessionId) => {
    try {
      const updated = [...sessions];
      const idx = updated.findIndex((s) => s.id === sessionId);
      if (idx === -1) return;

      const current = updated[idx];

      if (current.isMySession) {
        await removeFromSchedule(sessionId, token);
        updated[idx].isMySession = false;
      } else {
        await addToSchedule(sessionId, token);
        updated[idx].isMySession = true;
      }

      // 다시 라이브 세션 전체 불러오기 (최신 상태 반영)
      const updatedList = await getLiveSessions(token);
      setSessions(updatedList);
      console.log('✅ 라이브 세션 최신 목록:', updatedList);
    } catch (err) {
      console.error('❌ 세션 담기/취소 실패:', err);
    }
  };

  // 최초 마운트 시 한 번만 실행
  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);

        const sessionList = await getLiveSessions(token); // ✅ 여기도 변경됨
        if (!Array.isArray(sessionList)) {
          throw new Error('세션 데이터 형식이 올바르지 않습니다.');
        }

        setSessions(sessionList);
      } catch (err) {
        console.error('❌ 라이브 세션 조회 실패:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);

  return { sessions, loading, error, toggleSchedule, setSessions };
}
