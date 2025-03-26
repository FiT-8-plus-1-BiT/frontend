import React, { useEffect, useState } from 'react';
import { getAllSessions } from '../../api/session/get-all-session';
import { getLiveSessions } from '../../api/session/get-live-session';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
      <div className="relative w-8 h-8 rounded-[6px] overflow-hidden border border-[#E73323]">
        <img
          src={imageUrl}
          alt={sessionName}
          className="w-full h-full object-cover"
        />
        {isLive && (
          <span className="absolute top-[-2px] right-[-2px] w-2 h-2 bg-[#E73323] rounded-full" />
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-[#2c2e31] truncate max-w-[96px]">
          {sessionName}
        </span>
        <span className="text-xs text-[#9fa0a3] font-medium">{speakerName}</span>
      </div>
    </div>
  );
};

// 카테고리별 세션 목록
const SessionSection = ({ title, sessions }) => (
  <div className="flex flex-col gap-2 mb-4">
    <h3 className="text-[#797677] text-sm font-semibold px-4 pt-2">
      {title}
    </h3>
    <div className="flex flex-col gap-3 px-4">
      {sessions.map((session) => (
        <SessionItem key={session.id} {...session} />
      ))}
    </div>
  </div>
);

// 전체 Navbar
const StreamingSessionNavbar = () => {
  const [liveSessions, setLiveSessions] = useState([]);
  const [popularSessions, setPopularSessions] = useState([]);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchSessions = async () => {
      try {
        const allSessions = await getAllSessions(token);
        const liveSessionsData = await getLiveSessions(token);

        const mappedAll = allSessions.map((s) => ({
          id: s.id,
          sessionName: s.title,
          speakerName: s.speaker.name,
          imageUrl: s.speaker.image,
          isLive: false,
        }));

        const mappedLive = liveSessionsData.map((s) => ({
          id: s.id,
          sessionName: s.title,
          speakerName: s.speaker.name,
          imageUrl: s.speaker.image,
          isLive: true,
        }));

        setPopularSessions(mappedAll);
        setLiveSessions(mappedLive);
      } catch (e) {
        console.error('❗ 세션 정보 로딩 실패:', e);
      }
    };

    fetchSessions();
  }, [token]);

  return (
    <aside className="h-[768px] min-w-[132px] bg-white border-r border-gray-300 overflow-y-auto scrollbar-hide pt-[28px]">
      <SessionSection title="라이브 세션" sessions={liveSessions} />
      <SessionSection title="전체 세션" sessions={popularSessions} />
    </aside>
  );
};

export { StreamingSessionNavbar };