import React from 'react';

function SkeletonLiveSessionList() {
  const SkeletonItem = () => (
    <div className="relative flex flex-col md:w-[520px] md:h-[558px] rounded-xl overflow-hidden shadow bg-white">
      {/* 실시간 뱃지 자리 */}
      <div className="absolute top-3 left-3 bg-gray-300 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
        실시간
      </div>

      {/* 썸네일 영역 */}
      <div className="w-full h-[292px] bg-gray-100" />

      {/* 본문 */}
      <div className="p-5 flex flex-col gap-3">
        {/* 제목 + 담기 버튼 */}
        <div className="flex justify-between items-start gap-4">
          <div className="h-6 w-2/3 bg-gray-100 rounded" />
          <div className="h-9 w-[90px] bg-gray-100 rounded" />
        </div>

        {/* 강연자 이름 */}
        <div className="h-4 w-1/4 bg-gray-100 rounded border-b pb-[0.833vw]" />

        {/* 태그 */}
        <div className="flex flex-wrap gap-2 mt-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-8 w-20 bg-gray-100 rounded" />
          ))}
        </div>

        {/* 설명 */}
        <div className="space-y-2 mt-1">
          <div className="h-4 bg-gray-100 rounded w-full" />
          <div className="h-4 bg-gray-100 rounded w-5/6" />
          <div className="h-4 bg-gray-100 rounded w-4/6" />
        </div>

        {/* 혼잡도 영역 */}
        <div className="flex items-center bg-gray-100 w-[136px] h-[36px] mt-2">          
        </div>
      </div>
    </div>
  );

  return (
    <div>
      <h2 className="text-[44px] font-bold mb-4">현재 라이브 중인 세션</h2>
      <div className="grid justify-item-center xl:grid-cols-3 grid-cols-2 gap-8 mb-12">
        {[1, 2, 3, 4, 5, 6].map((_, i) => (
          <SkeletonItem key={i} />
        ))}
      </div>
    </div>
  );
}

export { SkeletonLiveSessionList };
