import React, { useEffect, useState } from 'react';
import { getAllSessions } from '~/api/session/get-all-session';
import { getLiveSessions } from '~/api/session/get-live-session';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectIsProfileComplete } from '~/redux/user-slice';

// 개별 세션 항목
const SessionItem = ({ sessionName, speakerName, imageUrl, isLive, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/streaming?session_id=${id}`);
  };

  return (
    <div
      className="flex items-center gap-3 cursor-pointer"
      title={sessionName}
      onClick={handleClick}
    >
      <div
        className={`relative w-8 h-8 rounded-[6px] overflow-hidden border ${
          isLive ? 'border-red-300 border-[1px]' : ''
        }`}
      >
        <img
          src={imageUrl}
          alt={sessionName}
          className="w-full h-full object-cover aspect-square"
        />
      </div>

      <div className="flex flex-col">
        <div className="relative w-fit max-w-[96px]">
          <span
            className="text-sm font-semibold text-[#2c2e31] truncate block pr-3"
            title={sessionName}
          >
            {sessionName}
          </span>
          {isLive && (
            <div className="absolute -top-1 -right-0 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </div>

        <span className="text-xs text-[#9fa0a3] font-medium">
          {speakerName}
        </span>
      </div>
    </div>
  );
};

// 카테고리별 세션 목록
const SessionSection = ({ title, sessions }) => (
  <div className="flex flex-col gap-2 mb-4">
    <h3 className="text-[#797677] text-sm font-semibold px-4 pt-2">{title}</h3>
    <div className="flex flex-col gap-3 px-4">
      {sessions.map((session) => (
        <SessionItem key={session.id} {...session} />
      ))}
    </div>
  </div>
);

const StreamingSessionNavbar = () => {
  const [liveSessions, setLiveSessions] = useState([]);
  const [recommendedSessions, setRecommendedSessions] = useState([]);
  const [allSessions, setAllSessions] = useState([]);

  const token = useSelector((state) => state.auth.token);
  const isProfileComplete = useSelector(selectIsProfileComplete);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const allSessions = await getAllSessions(token);
        const liveSessions = await getLiveSessions(token);

        const mappedAll = allSessions.map((s) => ({
          id: s.id,
          sessionName: s.title,
          speakerName: s.speaker.name,
          imageUrl: s.speaker.image,
          isLive: s.isLive,
        }));

        const mappedLive = liveSessions.map((s) => ({
          id: s.id,
          sessionName: s.title,
          speakerName: s.speaker.name,
          imageUrl: s.speaker.image,
          isLive: s.isLive,
        }));

        setAllSessions(mappedAll);
        setLiveSessions(mappedLive);

        // 🔥 프로필이 채워져 있을 때만 추천 세션 요청
        if (isProfileComplete) {
          const recommendedSessions = await getRecommendedSessions(token);
          const mappedRecommended = recommendedSessions.map((s) => ({
            id: s.id,
            sessionName: s.title,
            speakerName: s.speaker.name,
            imageUrl: s.speaker.image,
            isLive: s.isLive,
          }));
          setRecommendedSessions(mappedRecommended);
        }
      } catch (e) {
        console.error('❗ 세션 정보 로딩 실패:', e);
      }
    };

    if (token) fetchSessions();
  }, [token, isProfileComplete]);

  return (
    <aside className="h-[768px] min-w-[132px] bg-white border-r border-gray-300 overflow-y-auto scrollbar-hide pt-[28px]">
      <SessionSection title="라이브 세션" sessions={liveSessions} />
      <SessionSection title="전체 세션" sessions={allSessions} />
      {isProfileComplete && (
        <SessionSection title="인기 세션" sessions={recommendedSessions} />
      )}
    </aside>
  );
};

export { StreamingSessionNavbar };
