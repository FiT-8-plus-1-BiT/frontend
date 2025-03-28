import React from 'react';

/**
 * 단일 라이브 세션 아이템을 보여주는 컴포넌트
 * props:
 *  - sessionId: 세션 ID
 *  - isScheduled: 사용자가 담은 상태
 *  - thumbnail: 썸네일 이미지 URL
 *  - title: 세션 제목
 *  - description: 요약 설명
 *  - speaker: { name, image }
 *  - tags: 태그 배열
 *  - onToggleSchedule: 담기/취소 함수
 *  - onClick: 세션 클릭
 */
function LiveSessionItem({
  sessionId,
  isScheduled,
  thumbnail,
  title,
  description,
  speaker,
  tags,
  onToggleSchedule,
  onClick,
}) {
  return (
    <div
      className="lecture_container flex flex-col items-start w-[520px] cursor-pointer"
      onClick={onClick}
    >
      {/* 썸네일 영역 */}
      <div className="flex justify-center items-center self-stretch bg-white">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-[520px] h-[292px] object-cover"
          />
        ) : (
          <svg
            width={520}
            height={292}
            viewBox="0 0 520 292"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="520" height="292" fill="#D9D9D9" />
            <text
              x="50%"
              y="50%"
              dominantBaseline="middle"
              textAnchor="middle"
              fill="#999"
              fontSize="20"
              fontFamily="Pretendard"
            >
              이미지 없음
            </text>
          </svg>
        )}
      </div>

      {/* 본문 영역 */}
      <div className="flex flex-col items-start gap-2 self-stretch mt-4">
        {/* 제목 + 담기 버튼 */}
        <div className="flex justify-between items-start self-stretch">
          <div className="text-[#131212] font-bold text-[1.75rem] leading-[150%]">
            {title}
          </div>

          {/* 담기 버튼 */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // 부모 onClick 방지
              onToggleSchedule(sessionId);
            }}
            className={`flex flex-col justify-center items-center gap-2 h-10 px-4 border text-sm font-semibold ${
              isScheduled
                ? 'bg-red-500 text-white border-red-500'
                : 'border-[#85878d] text-[#85878d]'
            }`}
          >
            {isScheduled ? '담기 취소' : '담기'}
          </button>
        </div>

        {/* 강연자 */}
        <div className="flex items-center gap-2 text-[#131212] font-medium">
          {speaker?.name}
        </div>

        {/* 설명 */}
        <div className="text-[#85878d] text-sm leading-[150%] line-clamp-4">
          {description}
        </div>

        {/* 혼잡도 (예시) */}
        <div className="flex items-center gap-5">
          <span className="text-[#131212] font-medium">혼잡도</span>
          <span className="text-[#a9abb4] text-xl font-medium">●●○</span>
        </div>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {tags?.map((tag, idx) => (
            <div
              key={idx}
              className="h-8 bg-[#f4f4f4] rounded flex justify-center items-center px-4 text-sm font-semibold text-[#606166]"
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export { LiveSessionItem };
