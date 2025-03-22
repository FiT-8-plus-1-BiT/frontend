import { useEffect, useState } from "react";

export const useTopQuestions = (sessionId) => {
  const [topQuestions, setTopQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!sessionId) return;

    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`https://fit-conf.shop/api/v1/chat/questions/${sessionId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`서버 오류: ${response.status}`);
        }

        const data = await response.json();

        const top3 = data
          .filter((q) => q.category === "QUESTION")
          .sort((a, b) => b.likes - a.likes)
          .slice(0, 3);

        setTopQuestions(top3);
      } catch (err) {
        console.error("질문 불러오기 실패:", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [sessionId]);

  return { topQuestions, loading, error };
};
