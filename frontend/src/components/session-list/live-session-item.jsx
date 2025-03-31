import React from 'react';

/**
 * 단일 라이브 세션 아이템을 보여주는 컴포넌트
 */
function LiveSessionItem({
  sessionId,
  isScheduled,
  thumbnail,
  title,
  description,
  speaker,
  tags,
  congestion = 2, // 혼잡도: 1~3
  onToggleSchedule,
  onClick,
  isLive = true,
}) {
  // 혼잡도 점 생성 함수
  const renderCongestionDots = () => {
    return [1, 2, 3].map((n) => (
      <span
        key={n}
        className={`w-2 h-2 rounded-full ${n <= congestion ? 'bg-red-500' : 'bg-gray-300'
          }`}
      />
    ));
  };

  return (
    <div
      className="relative flex flex-col md:w-[520px] md:h-[558px] rounded-xl overflow-hidden shadow hover:shadow-md cursor-pointer bg-white"
      onClick={onClick}
    >
      {/* 실시간 뱃지 */}
      {isLive && (
        <div className="absolute top-3 left-3 bg-red-300 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          실시간
        </div>
      )}

      {/* 썸네일 이미지 */}
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

      {/* 본문 */}
      <div className="p-5 flex flex-col gap-3">
        {/* 제목 + 담기 버튼 */}
        <div className="flex justify-between items-start gap-4">
          <div className="text-[24px] !font-black leading-snug text-gray-900">
            {title}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSchedule(sessionId);
            }}
            className={`h-9 px-4 text-[14px] font-semibold border ${isScheduled
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
        <div className="text-[14px] text-gray-550 text-[14px] leading-relaxed line-clamp-4">
          {description}
        </div>

        {/* 혼잡도 */}
        <div className="flex items-center w-[138px] items-center h-[38px] rounded-[4px] bg-gray-100 gap-[8px] py-[4px] px-[16px]">
          <span className="text-[#131212] w-[52px] h-[30px] font-medium text-[20px]">혼잡도</span>
          <div className="flex gap-1">{renderCongestionDots()}</div>
        </div>


      </div>
    </div>
  );
}

export { LiveSessionItem };
