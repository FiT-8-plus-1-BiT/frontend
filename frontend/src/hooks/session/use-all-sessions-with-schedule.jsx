import { useEffect, useState } from 'react';
import { addToSchedule, removeFromSchedule } from '~/utils/session/schedule';
import { getAllSessions } from '~/api/session/get-all-session';

export function useAllSessionsWithSchedule(token) {
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
      const updatedList = await getAllSessions(token);
      setSessions(updatedList);
      console.log('updatedList',updatedList)
    } catch (err) {
      console.error('세션 담기/취소 실패:', err);
    }
  };

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        setLoading(true);

        // 전체 세션 가져오기
        const sessionList = await getAllSessions(token); // full response
        if (!Array.isArray(sessionList)) {
          throw new Error('세션 데이터 형식이 올바르지 않습니다.');
        }

        setSessions(sessionList); // 그대로 넣기 (isMySession 포함됨)
      } catch (err) {
        console.error('세션 조회 실패:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSessions();
  }, []);
  console.log(sessions)
  return { sessions, loading, error, toggleSchedule, setSessions };
}
