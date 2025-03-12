import React from 'react';

/**
 * 단일 강연(세션) 아이템을 보여주는 컴포넌트
 * props로 전달된 데이터(썸네일, 제목, 설명, 날짜, 강연자 이름, 태그)를 표시
 */
function SessionItem({
  thumbnail,
  title,
  description,
  tags,
  speaker,
}) {
    console.log(tags)
  return (
    <div className=" rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* 썸네일 영역 */}
      <div className="w-full h-[504px] bg-gray-200">
        {thumbnail ? (
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        ) : (
          /* 썸네일이 없으면 회색 배경 */
          <div className="w-full h-[504px] flex items-center justify-center text-gray-500">
            이미지 없음
          </div>
        )}
      </div>

      {/* 내용 영역 */}
      <div className="pt-[12px] flex flex-col gap-2">
        {/* 태그 */}
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-200 text-gray-700 text-xs font-semibold px-2 py-1 rounded-md"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 제목 */}
        <h3 className="text-xl font-semibold line-clamp-2">
          {title}
        </h3>

        {/* 강연자 이름 */}
        <p className="text-sm font-medium text-gray-700">{speaker}</p>

        {/* 설명(최대 3줄까지 표시, 초과 시 말줄임) */}
        <p className="text-sm text-gray-600 line-clamp-3">
          {description}
        </p>

      </div>
    </div>
  );
}

export { SessionItem };
