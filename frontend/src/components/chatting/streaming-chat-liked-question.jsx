import React from 'react';
import { useTopQuestions } from '~/hooks/chat/use-top-question';
import { Heart } from 'lucide-react';
import isEqual from 'lodash.isequal'; // 깊은 비교

const QuestionListComponent = ({ sessionId }) => {
  const { topQuestions, loading, error } = useTopQuestions(sessionId);
  if (loading) return <p>로딩 중...</p>;

  return (
    <div className="bg-gray-100 m-2 p-2">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">인기질문</h2>

      <ul className="space-y-3 overflow-y-auto h-[14vw]">
        {topQuestions.map((q) => {
          const timestamp = new Date(q.timestamp);
          const timeStr = `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;

          return (
            <li
              key={q.messageId}
              className="flex justify-between bg-white items-start hover:bg-gray-50 px-2 py-1 "
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">
                  {q.name} · {timeStr}
                </span>
                <p className="text-m font-bold text-blue-700 leading-snug">{q.message}</p>
              </div>

              <div className="flex items-center gap-1 text-[#262F70] text-sm font-semibold">
                <Heart className="w-4 h-4 fill-[#262F70] text-[#262F70]" />
                {q.likes}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

// ✅ memo + isEqual로 props가 동일할 경우 렌더링 방지
const QuestionList = React.memo(QuestionListComponent, isEqual);

export { QuestionList };
