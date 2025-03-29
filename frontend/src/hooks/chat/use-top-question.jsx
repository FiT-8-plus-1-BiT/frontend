import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const fetchZsetQuestions = async (token, sessionId, page = 0, size = 3) => {
  const url = `https://fit-conf.shop/api/v1/chat/questions/zset/${sessionId}?page=${page}&size=${size}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error(`서버 오류: ${res.status}`);
    }

    const data = await res.json();
    console.log('질문 응답 데이터:', data);
    return data;
  } catch (err) {
    console.error('질문 불러오기 실패:', err);
    return null;
  }
};

export const useTopQuestions = (sessionId) => {
  const [topQuestions, setTopQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (!sessionId) return;

    const fetchAndSet = async () => {
      setLoading(true);
      setError(null);
      const data = await fetchZsetQuestions(token, sessionId);
      console.log(data)
      if (data) {
        const top3 = data.response 
          ?.filter((q) => q.category === "QUESTION")
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 3);
        setTopQuestions(top3 || []);
      } else {
        setTopQuestions([]);
        setError("질문 불러오기 실패");
      }

      setLoading(false);
    };

    fetchAndSet();
  }, [sessionId]);

  return { topQuestions, loading, error };
};
