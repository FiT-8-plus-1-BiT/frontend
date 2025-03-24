import React, { useState } from 'react';

import { postLike, deleteLike } from '~/api/session/session-like-unlike'; // 이건 위 함수 저장한 파일 경로

const handleLike = async () => {
  const result = await postLike(1); // 세션 ID에 따라 변경
  if (result) {
    console.log('좋아요 성공:', result);
  }
};

const handleUnlike = async () => {
  const result = await deleteLike(1);
  if (result) {
    console.log('좋아요 취소 성공:', result);
  }
};
// 공통 스타일 변수
const tagClasses =
  "flex justify-center items-center self-stretch rounded-lg border bg-[#efeffd] border-[#efeffd] py-1 px-4 h-8 text-[#4f5158] text-center font-['Pretendard'] text-sm font-semibold leading-[140%]";
const buttonClasses =
  'flex justify-center items-center gap-2 py-2 px-5  border border-[#efeffd] bg-[#fafafe] text-sm font-medium';

// SVG 아이콘 컴포넌트
const Icon = ({ color = '#171719' }) => (
  <svg
    width={16}
    height={16}
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6.23 2.17c0-.33.27-.6.6-.6h2.33c.33 0 .6.27.6.6s-.27.6-.6.6H6.83c-.33 0-.6-.27-.6-.6z"
      fill={color}
    />
  </svg>
);

// 태그 리스트
const tags = ['디자이너', '기술스택', '뭐든 배워가자'];

function StreamingInformation({ mode }) {
  const [muted, setMuted] = useState(false); // 음소거 상태 관리

  return (
    <div className={`flex flex-col gap-6 mt-6`}>
      {/* 강연 정보 */}
      <div
        className={`flex flex-col gap-[12px] ${mode ? 'order-2' : 'order-1'}`}
      >
        {/* 태그 리스트 */}
        <div className="flex gap-2 pb-[12px]">
          {tags.map((tag, idx) => (
            <span key={idx} className={tagClasses}>
              {tag}
            </span>
          ))}
        </div>

        {/* 강연 제목 & 버튼 그룹 */}
        <div className="flex flex-col xl:flex-row xl:justify-between gap-[20px] xl:gap-[40px]">
          {/* 제목 */}
          <h1 className="md:text-3xl text-xl font-semibold text-[#0e0e0e]">
            예비 토스 디자이너의 컨포넌트 만든 척 해보기
          </h1>

          {/* 버튼 그룹 */}
          <div className="flex md:flex-row gap-2 xl:gap-3">
            <button
              className={`${buttonClasses} text-[#383de7] whitespace-nowrap`}
            >
              <Icon color="#383de7" />
              좋아요 <span className="text-xs text-[#9fa0a3]">n.nn</span>
            </button>
            <button className={`${buttonClasses} whitespace-nowrap`}>
              <Icon />
              싫어요 <span className="text-xs text-[#9fa0a3]">n.nn</span>
            </button>
            <button className={`${buttonClasses} whitespace-nowrap`}>
              <Icon />
              공유하기
            </button>
          </div>
        </div>
      </div>

      {/* 강연 상세 정보 박스 */}
      <div
        className={`p-6  mb-10 bg-gray-50  ${mode ? 'order-1 ' : 'order-2'}`}
      >
        {mode && (
          <div className="flex items-center justify-between gap-2">
            {/* 프로그레시브 바 */}
            <div className="w-full h-2 bg-gray-200 rounded-full flex items-center">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: '50%' }}
              ></div>
            </div>

            {/* 음소거 버튼 */}
            <button
              className="px-4 py-2 rounded bg-gray-0 hover:bg-gray-200 transition"
              onClick={() => setMuted(!muted)}
            >
              {muted ? '🔇' : '🔊'}
            </button>
          </div>
        )}

        {/* 강연자 정보 */}
        <div className="flex justify-between pb-[20px] border-b border-black">
          {/* 프로필 이미지 */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-full"></div>
            <span className="text-lg font-medium text-[#131212]">박수연</span>
          </div>
          <span className="text-sm items-center text-black">
            N 일차 · 00:00 - 00:00
          </span>
        </div>

        {/* 강연 제목 */}
        <h2 className="mt-6 text-xl font-bold text-[#000000]">
          토스는 원래 디자인을 잘하지 않았다
        </h2>

        {/* 강연 설명 */}
        <p className="text-sm text-[#000000] leading-[150%] mt-2">
          10년의 고군분투 끝에 얻게 된 ‘좋은 디자인’을 위한 8가지 능력치. 최초
          공개하는 디자인 B안과 함께 톺아보는 토스 디자인 성장기.
        </p>
      </div>
    </div>
  );
}

export { StreamingInformation };
