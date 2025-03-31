import React from 'react';

function AllSessionItem({
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
      onClick={onClick}
      className="w-[520px] h-[558px] bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* 썸네일 */}
      <div className="w-full h-[292px] bg-gray-100">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            이미지 없음
          </div>
        )}
      </div>

      {/* 내용 영역 */}
      <div className="p-5 flex flex-col gap-3">
        {/* 제목 + 담기 버튼 */}
        <div className="flex justify-between items-start gap-4">
          <div className="text-[24px] !font-black leading-snug text-gray-900">
            {title}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSchedule(id);
            }}
            className={`text-[14px] font-semibold border ${
              isScheduled
                ? 'bg-black text-white border-black w-[116px] h-[36px]'
                : 'text-gray-800 border-gray-800 w-[90px] h-[36px]'
            }`}
          >
            {isScheduled ? '✓ 담은 강연' : '+ 담기'}
          </button>
        </div>

        {/* 강연자 */}
        <div className="text-gray-700 font-semibold text-[16px] pb-[0.833vw] border-b">
          {speaker?.name}
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mt-1">
          {tags?.map((tag, idx) => (
            <div
              key={idx}
              className="h-8 bg-gray-100 rounded px-4 flex items-center text-[14px] font-semibold text-gray-550"
            >
              {tag}
            </div>
          ))}
        </div>

        {/* 설명 */}
        <div className="text-[14px] text-gray-550 leading-relaxed line-clamp-4">
          {description}
        </div>
      </div>
    </div>
  );
}

export { AllSessionItem };
