// ~/hooks/session/use-scheduled-session.jsx
import { useEffect, useState } from 'react';

const BASE_URL = 'https://fit-conference.shop';

export function useScheduledSessions(token) {
  const [scheduledSessions, setScheduledSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      setError('토큰이 없습니다.');
      setLoading(false);
      return;
    }

    const fetchSchedule = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          throw new Error(`서버 오류: ${res.status}`);
        }

        const data = await res.json();
        console.log('스케줄된 세션',data.response)
        setScheduledSessions(data.response || []);
      } catch (err) {
        setError(err.message || '알 수 없는 오류');
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [token]);

  // ✅ setScheduledSessions도 반환해주기
  return { scheduledSessions, setScheduledSessions, loading, error };
}
