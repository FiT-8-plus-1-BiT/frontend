import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getSessionInformation } from '~/api/session/get-session-information';
import { postLike, deleteLike } from '~/api/session/session-like-unlike';
import { ThumbsUp, Share } from 'lucide-react';
import AudienceStreaming from './audience-streaming';

const tagClasses =
  "flex justify-center items-center self-stretch rounded-[4px] border bg-gray-500 py-1 px-4 h-8 text-white text-center font-['Pretendard'] text-sm font-semibold leading-[140%]";

function StreamingInformation({ mode }) {
  const [sessionInfo, setSessionInfo] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const data = await getSessionInformation(sessionId, token);
        setSessionInfo(data);
        setIsLiked(data.isLiked);
        setLikesCount(data.likesCount ?? 0);
      } catch (e) {
        console.error('❗ 세션 정보 로딩 실패:', e);
      }
    };

    if (sessionId) fetchSession();
  }, [sessionId]);

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

        {/* 제목 */}
        <h1 className="md:text-3xl text-xl font-semibold text-[#0e0e0e]">
          {sessionInfo?.title || '로딩 중...'}
        </h1>

        {/* 좋아요/공유하기 버튼 */}
        {mode ? (
          <div className="flex md:flex-row gap-2 xl:gap-3 mt-2">
            <button
              onClick={isLiked ? handleUnlike : handleLike}
              className={`flex items-center gap-2 py-2 px-5 border rounded-md transition 
        ${isLiked ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-500'}
      `}
            >
              <ThumbsUp
                size={16}
                strokeWidth={2}
                className={
                  isLiked ? 'fill-blue-700 text-blue-700' : 'text-gray-500'
                }
              />
              좋아요
              <span className="text-xs text-[#9fa0a3]">{likesCount}</span>
            </button>

            <button className="flex items-center gap-2 py-2 px-5 border border-gray-300 rounded-md bg-white text-gray-500">
              <Share size={16} strokeWidth={2} />
              공유하기
            </button>
          </div>
        ) : (
          <div className="flex md:flex-row gap-2 xl:gap-3">
            <button
              onClick={isLiked ? handleUnlike : handleLike}
              className={`flex items-center gap-2 py-2 px-5 border rounded-md transition 
        ${isLiked ? 'border-blue-700 bg-blue-50 text-blue-700' : 'border-gray-300 bg-white text-gray-500'}
      `}
            >
              <ThumbsUp
                size={16}
                strokeWidth={2}
                className={
                  isLiked ? 'fill-blue-700 text-blue-700' : 'text-gray-500'
                }
              />
              좋아요
              <span className="text-xs text-[#9fa0a3]">{likesCount}</span>
            </button>

            <button className="flex items-center gap-2 py-2 px-5 border border-gray-300 rounded-md bg-white text-gray-500">
              <Share size={16} strokeWidth={2} />
              공유하기
            </button>
          </div>
        )}
      </div>

      {/* 상세 정보 박스 */}
      <div className={`p-6 mb-10 bg-gray-0 ${mode ? 'order-1' : 'order-2'}`}>
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
            <span className="text-xl font-bold text-[#131212]">
              {sessionInfo?.speaker?.name || '발표자'}
            </span>
          </div>
          {mode && (
            <div className="flex items-center justify-between gap-2">
              <AudienceStreaming />
            </div>
          )}
        </div>

        <h2 className="mt-6 text-xl font-bold text-[#000000]">
          {sessionInfo?.title || '강연 제목'}
        </h2>

        <p className="text-sm text-[#000000] leading-[150%] mt-2">
          {sessionInfo?.summary || '강연 요약이 없습니다.'}
        </p>
      </div>
    </div>
  );
}

export { StreamingInformation };
