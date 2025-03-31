import React from 'react';

function SkeletonAllSessionList() {
  const SkeletonItem = () => (
    <div className="w-[520px] h-[558px] bg-white rounded-xl overflow-hidden shadow hover:shadow-md animate-pulse">
      {/* 썸네일 */}
      <div className="w-full h-[292px] bg-gray-100" />

      {/* 내용 영역 */}
      <div className="p-5 flex flex-col gap-3">
        {/* 제목 + 담기 버튼 */}
        <div className="flex justify-between items-start gap-4">
          <div className="h-6 w-2/3 bg-gray-100 rounded" />
          <div className="h-[36px] w-[90px] bg-gray-100 rounded border" />
        </div>

        {/* 강연자 이름 */}
        <div className="h-4 w-1/4 bg-gray-100 rounded border-b pb-[0.833vw]" />

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mt-1">
          {[1, 2, 3].map((_, idx) => (
            <div key={idx} className="h-8 w-20 bg-gray-100 rounded" />
          ))}
        </div>

        {/* 설명 */}
        <div className="space-y-2 mt-2">
          <div className="h-4 w-full bg-gray-100 rounded" />
          <div className="h-4 w-5/6 bg-gray-100 rounded" />
          <div className="h-4 w-4/6 bg-gray-100 rounded" />
        </div>
        
      </div>
    </div>
  );

  return (
    <>
      <h2 className="text-[44px] font-bold mb-4">전체 세션</h2>

      <div className="grid place-items-center xl:grid-cols-3 grid-cols-2 gap-8 mb-12">
        {[...Array(6)].map((_, idx) => (
          <SkeletonItem key={idx} />
        ))}
      </div>
    </>
  );
}

export { SkeletonAllSessionList };
