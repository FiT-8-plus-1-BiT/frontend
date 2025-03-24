import React from 'react';

/**
 * 단일 강연(세션) 아이템을 보여주는 컴포넌트
 */
function SessionItem({ thumbnail, title, description, tags, speaker }) {
  return (
    <div
      className="overflow-hidden bg-white transition-shadow rounded-md shadow-sm"
      style={{
        width: 'clamp(300px, 27.08vw, 520px)', // 520px @ 1920px 기준
      }}
    >
      {/* 썸네일 영역 */}
      <div
        className="w-full items-center bg-gray-200"
        style={{ height: 'clamp(200px, 15.2vw, 292px)' }}
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

      {/* 내용 영역 */}
      <div className="pt-3 px-4 pb-5 flex flex-col gap-2">
        {/* 제목 */}
        <h3
          className="font-semibold line-clamp-2"
          style={{ fontSize: 'clamp(18px, 1.6vw, 24px)' }}
        >
          {title}
        </h3>

        {/* 강연자 이름 */}
        <p
          className="text-gray-700 font-medium"
          style={{ fontSize: 'clamp(14px, 1.2vw, 18px)' }}
        >
          {speaker}
        </p>

        {/* 설명 */}
        <p
          className="text-gray-600 line-clamp-3"
          style={{ fontSize: 'clamp(13px, 1vw, 16px)' }}
        >
          {description}
        </p>

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 pt-1">
          {Object.values(tags).map((value, idx) => (
            <span
              key={idx}
              className="px-2 py-[2px] bg-gray-100 text-gray-800 text-sm rounded-full"
            >
              {value}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export { SessionItem };
