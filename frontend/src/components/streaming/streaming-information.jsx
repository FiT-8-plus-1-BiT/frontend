import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSessionInformation } from '~/api/session/get-session-information';
import { postLike, deleteLike } from '~/api/session/session-like-unlike';
import { useAudienceStreaming } from '../../hooks/streaming/use-audience-streaming';
import AudienceStreaming from './audience-streaming';
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

function StreamingInformation({ mode }) {
  const [muted, setMuted] = useState(false);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(null);

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  console.log('세션아이디', sessionId)
  const token = useSelector((state) => state.auth.token); // 💡 리덕스에서 토큰 가져오기
  const { remoteAudioRef } = useAudienceStreaming(sessionId, token, mode); // mode가 true일 때만 start

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getSessionInformation(sessionId, token);
        setSessionInfo(data);
        setIsLiked(data.isLiked);
        setLikesCount(data.likesCount);
      } catch (e) {
        console.error('❗ 세션 정보 로딩 실패:', e);
      }
    };

    if (sessionId) fetchSession();
  }, [sessionId]);
  console.log('세션정보', sessionInfo)
  const handleLike = async () => {
    try {
      await postLike(sessionId, token);
      setIsLiked(true);
      setLikesCount((prev) => prev + 1);
    } catch (e) {
      console.error('좋아요 실패', e);
    }
  };

  const handleUnlike = async () => {
    try {
      await deleteLike(sessionId, token);
      setIsLiked(false);
      setLikesCount((prev) => Math.max(0, prev - 1));
    } catch (e) {
      console.error('좋아요 취소 실패', e);
    }
  };

  return (
    <div className={`flex flex-col gap-6 mt-6`}>
      {/* 강연 정보 */}
      <div
        className={`flex flex-col gap-[12px] ${mode ? 'order-2' : 'order-1'}`}
      >
        {/* 태그 리스트 */}
        <div className="flex gap-2 pb-[12px]">
          {sessionInfo?.tags &&
            Object.values(sessionInfo.tags).map((tag, idx) => (
              <span key={idx} className={tagClasses}>
                {tag}
              </span>
            ))}
        </div>

        {/* 강연 제목 & 버튼 그룹 */}
        <div className="flex flex-col xl:flex-row xl:justify-between gap-[20px] xl:gap-[40px]">
          {/* 제목 */}
          <h1 className="md:text-3xl text-xl font-semibold text-[#0e0e0e]">
            {sessionInfo?.title || '로딩 중...'}
          </h1>

          {/* 버튼 그룹 */}
          <div className="flex md:flex-row gap-2 xl:gap-3">
            <button
              onClick={isLiked ? handleUnlike : handleLike}
              className={`${buttonClasses} text-[#383de7] whitespace-nowrap`}
            >
              <Icon color="#383de7" />
              좋아요
              <span className="text-xs text-[#9fa0a3]">{likesCount}</span>
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
            <AudienceStreaming />
            <div className="w-full h-2 bg-gray-200 rounded-full flex items-center">
              <div
                className="h-full bg-blue-500 rounded-full"
                style={{ width: '50%' }}
              ></div>
            </div>
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
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-full overflow-hidden">
              {sessionInfo?.speaker?.image && (
                <img
                  src={sessionInfo.speaker.image}
                  alt="speaker"
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            <span className="text-lg font-medium text-[#131212]">
              {sessionInfo?.speaker?.name || '발표자'}
            </span>
          </div>
          <span className="text-sm items-center text-black">
            N 일차 · 00:00 - 00:00
          </span>
        </div>

        {/* 강연 제목 */}
        <h2 className="mt-6 text-xl font-bold text-[#000000]">
          {sessionInfo?.title || '강연 제목'}
        </h2>

        {/* 강연 설명 */}
        <p className="text-sm text-[#000000] leading-[150%] mt-2">
          {sessionInfo?.summary || '강연 요약이 없습니다.'}
        </p>
      </div>
    </div>
  );
}

export { StreamingInformation };
