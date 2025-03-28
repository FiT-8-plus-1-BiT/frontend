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
      className="w-[520px] bg-white rounded-xl overflow-hidden shadow hover:shadow-md transition-shadow cursor-pointer"
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
          <div className="text-[1.5rem] font-bold leading-snug text-[#131212]">
            {title}
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSchedule(id);
            }}
            className={`h-9 px-4 text-sm font-semibold rounded border ${
              isScheduled
                ? 'bg-black text-white border-black'
                : 'text-[#85878d] border-[#85878d]'
            }`}
          >
            {isScheduled ? '✓ 담은 강연' : '+ 담기'}
          </button>
        </div>

        {/* 강연자 이름 */}
        <div className="text-[#131212] font-medium text-sm">
          {speaker?.name}
        </div>

        {/* 설명 */}
        <div className="text-[#85878d] text-sm leading-relaxed line-clamp-3">
          {description}
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mt-1">
          {tags?.map((tag, idx) => (
            <div
              key={idx}
              className="h-8 bg-[#f4f4f4] rounded px-4 flex items-center text-sm font-medium text-[#606166]"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { AllSessionItem };
