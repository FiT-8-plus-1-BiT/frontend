import { useTopQuestions } from "~/hooks/chat/use-top-question";

const QuestionList = ({ sessionId }) => {
  const { topQuestions, loading, error } = useTopQuestions(sessionId);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error.message}</p>;

  return (
    <div className="bg-gray-100">
      <h2 className="font-bold mb-2">🔥 인기 질문 TOP 3</h2>
      <ul className="space-y-2">
        {topQuestions.map((q) => (
          <li key={q.messageId} className="p-2 border rounded-md bg-white shadow-sm">
            <div className="text-sm text-gray-800">{q.message}</div>
            <div className="text-xs text-gray-500 mt-1">❤️ {q.likes} · {q.name}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};


export {QuestionList}
