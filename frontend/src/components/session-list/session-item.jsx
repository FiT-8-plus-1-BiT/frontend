import React from 'react';

function SessionItem({
  id,
  thumbnail,
  title,
  description,
  tags,
  speaker,
  isScheduled,
  onToggleSchedule,
  onClick,
}) {
  return (
    <div
      className="overflow-hidden bg-white transition-shadow rounded-md shadow-sm cursor-pointer"
      style={{ width: 'clamp(300px, 27.08vw, 520px)' }}
    >
      {/* 썸네일 */}
      <div
        className="w-full bg-gray-200"
        style={{ height: 'clamp(200px, 15.2vw, 292px)' }}
        onClick={onClick}
      >
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-500">
            이미지 없음
          </div>
        )}
      </div>

      {/* 내용 */}
      <div className="pt-3 px-4 pb-5 flex flex-col gap-2">
        <h3
          className="font-semibold line-clamp-2"
          style={{ fontSize: 'clamp(18px, 1.6vw, 24px)' }}
        >
          {title}
        </h3>

        <p
          className="text-gray-700 font-medium"
          style={{ fontSize: 'clamp(14px, 1.2vw, 18px)' }}
        >
          {speaker}
        </p>

        <p
          className="text-gray-600 line-clamp-3"
          style={{ fontSize: 'clamp(13px, 1vw, 16px)' }}
        >
          {description}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 pt-1">
          {Array.isArray(tags)
            ? tags.map((value, idx) => (
                <span
                  key={idx}
                  className="px-2 py-[2px] bg-gray-100 text-gray-800 text-sm rounded-full"
                >
                  {value}
                </span>
              ))
            : null}
        </div>

        {/* 미리 담기 버튼 (담았다면 '담기 취소', 아니면 '미리 담기') */}
        <div className="flex justify-end mt-2">
          <button
            className={`px-3 py-1 rounded-md text-sm font-semibold ${
              isScheduled ? 'bg-red-500 text-white' : 'bg-blue-500 text-white'
            }`}
            onClick={(e) => {
              e.stopPropagation(); // 부모 div onClick 막기
              onToggleSchedule(id);
            }}
          >
            {isScheduled ? '담기 취소' : '미리 담기'}
          </button>
        </div>
      </div>
    </div>
  );
}

export { SessionItem };
