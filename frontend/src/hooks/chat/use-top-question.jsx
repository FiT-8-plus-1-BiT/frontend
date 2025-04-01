import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import isEqual from 'lodash.isequal';

// ✅ API 호출 함수 (목데이터 제거 + sessionId 필터)
async function fetchQuestions(sessionId, token, page = 0, size = 6) {
  const url = `https://fit-conf.shop/api/v1/chat/questions/zset/${sessionId}?page=${page}&size=${size}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`서버 오류: ${response.status}`);
    }

    const data = await response.json(); // 👈 { response: [...] } 또는 그냥 배열인지 확인
    console.log('✅ [API 응답]', data);

    const responseData = data || []; // 👈 핵심

    // 🚀 필터링
    const filtered = responseData.filter((q) => Number(q.sessionId) === Number(sessionId));

    return { response: filtered };
  } catch (error) {
    console.error('❌ 질문 불러오기 실패:', error);
    return { response: [] };
  }
}


// ✅ 커스텀 훅
export const useTopQuestions = (sessionId) => {
  const [topQuestions, setTopQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!sessionId || !token) return;

    let intervalId;

    const fetchAndSet = async () => {
      try {
        setLoading(true);
        const data = await fetchQuestions(sessionId, token);
        console.log('data',data)
        const questions = data.response
          ?.filter((q) => q.category === 'QUESTION')
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 6);

        if (!isEqual(questions, topQuestions)) {
          setTopQuestions(questions || []);
        }
      } catch (err) {
        console.error('에러 발생:', err);
        setError(err.message || '알 수 없는 에러');
      } finally {
        setLoading(false);
      }
    };

    fetchAndSet();
    intervalId = setInterval(fetchAndSet, 10000);
    return () => clearInterval(intervalId);
  }, [sessionId, token, topQuestions]); // topQuestions 의존성도 필요

  return { topQuestions, loading, error };
};