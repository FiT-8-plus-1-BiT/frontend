import React, { memo, useState, useEffect } from 'react';
import { Heart } from 'lucide-react';

const MessageItem = memo(({ msg, onLikeToggle }) => {
  // 좋아요 상태를 리덕스에서 가져오고, 로컬 상태로 관리
  const [liked, setLiked] = useState(msg.isLiked);

  // `useEffect`를 통해 초기 상태만 설정 (상위 컴포넌트 상태로 관리)
  useEffect(() => {
    setLiked(msg.isLiked);  // 리덕스 상태와 동기화 (초기값만 설정)
  }, [msg.isLiked]);

  // 좋아요 클릭 시 상태를 반전시키는 함수
  const handleLikeClick = () => {
    const newLikeStatus = !liked;
    setLiked(newLikeStatus);  // 로컬 상태 업데이트
    onLikeToggle(msg.messageId, liked);  // 상위 컴포넌트로 상태 변경 전달
  };

  const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const isQuestion = msg.category?.toLowerCase() === 'question';

  return (
    <div className="w-full m-1 flex items-start justify-between">
      {/* 왼쪽: 시간 + 이름 + 내용 */}
      <div className="flex-1 flex gap-2">
        {/* 시간 */}
        <span className="text-[14px] text-gray-500 min-w-[40px]">
          {formattedTime}
        </span>

        {/* 이름 + 내용 */}
        <div className="flex-1">
          <div className="flex items-start">
            <span className="text-[14px] font-semibold text-gray-800 mr-1 whitespace-nowrap">
              {msg.name}:
            </span>
            <span
              className={`text-[14px] break-words whitespace-pre-wrap ${
                isQuestion ? 'text-blue-600 font-bold' : 'text-gray-800'
              }`}
              style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            >
              {msg.message}
            </span>
          </div>
        </div>
      </div>

      {/* 오른쪽 하트 버튼 (질문일 경우만) */}
      {isQuestion && (
        <button
          onClick={handleLikeClick}
          className={`ml-2 p-1 rounded-full transition-colors ${
            liked ? 'text-blue-600' : 'text-gray-400'
          } hover:text-blue-600`}
        >
          <Heart
            size={16}
            fill={liked ? 'currentColor' : 'none'}
            stroke="currentColor"
            strokeWidth={2}
          />
        </button>
      )}
    </div>
  );
});

export default MessageItem;
