import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Heart } from 'lucide-react';
import isEqual from 'lodash.isequal';
import { fetchLikes, toggleLike } from '~/redux/question-slice'; // 리덕스 액션

const QuestionListComponent = ({ sessionId }) => {
  const dispatch = useDispatch();
  const { questions, likeStatusMap, loading, error } = useSelector((state) => state.questions);

  useEffect(() => {
    if (sessionId) {
      dispatch(fetchLikes(sessionId));  // 좋아요 상태 불러오기
    }
  }, [dispatch, sessionId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  const handleLikeToggle = (messageId, isLiked) => {
    dispatch(toggleLike({ sessionId, messageId, isLiked }));
  };

  return (
    <div className="bg-gray-100 m-2 p-2">
      <h2 className="text-xl font-semibold text-gray-900 mb-3">인기질문</h2>

      <ul className="space-y-3 overflow-y-auto h-[14vw]">
        {questions.map((q) => {
          const timestamp = new Date(q.timestamp);
          const timeStr = `${timestamp.getHours().toString().padStart(2, '0')}:${timestamp
            .getMinutes()
            .toString()
            .padStart(2, '0')}`;

          // likeStatusMap에서 좋아요 상태를 확인하여 `isLiked` 상태 결정
          const isLiked = likeStatusMap[q.messageId] ?? false;

          return (
            <li
              key={q.messageId}
              className="flex justify-between bg-white items-start hover:bg-gray-50 px-2 py-1"
            >
              <div className="flex flex-col">
                <span className="text-xs text-gray-500 mb-1">
                  {q.name} · {timeStr}
                </span>
                <p className="text-m font-bold text-blue-700 leading-snug">{q.message}</p>
              </div>

              <button
                className="flex items-center gap-1 text-[#262F70] text-sm font-semibold"
                onClick={() => handleLikeToggle(q.messageId, !isLiked)}
              >
                <Heart
                  className={`w-4 h-4 ${isLiked ? 'fill-[#262F70]' : 'fill-none'} text-[#262F70]`}
                />
                {q.likes }
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const QuestionList = React.memo(QuestionListComponent, isEqual);

export { QuestionList };
