import React, { memo } from 'react';
import { Heart } from 'lucide-react';

const MessageItem = memo(({ msg, onLikeToggle }) => {
  const handleLikeClick = () => onLikeToggle(msg.messageId, msg.likedByUser);

  const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });

  const isQuestion = msg.category?.toLowerCase() === 'question';
  const isLiked = !!msg.likedByUser;

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
            isLiked ? 'text-blue-600' : 'text-gray-400'
          } hover:text-blue-600`}
        >
          <Heart
            size={16}
            fill={isLiked ? 'currentColor' : 'none'} // ← 이게 핵심
            stroke="currentColor"
            strokeWidth={2}
          />
        </button>
      )}
    </div>
  );
});

export default MessageItem;
