import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionFilter from '~/components/session-list/session-filter';
import { AllSessionItem } from '~/components/session-list/all-session-item';
import { useAllSessionsWithSchedule } from '~/hooks/session/use-all-sessions-with-schedule';
import Pagination from './session-list-pagination';
import { SkeletonAllSessionList } from '~/components/session-list/skeleton-all-session-list';

const ITEMS_PER_PAGE = 6;

export default function AllSessionList({ token }) {
  const [filters, setFilters] = useState({
    category: '',
    topic: '',
    contentType: '',
    level: '',
  });
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();
  const { sessions, loading, error, toggleSchedule } =
    useAllSessionsWithSchedule(token);

  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      const { tags } = session;
      return (
        (filters.category ? tags.field === filters.category : true) &&
        (filters.topic ? tags.topic === filters.topic : true) &&
        (filters.contentType ? tags.type === filters.contentType : true) &&
        (filters.level ? tags.level === filters.level : true)
      );
    });
  }, [sessions, filters]);

  // 페이징 계산
  const totalPages = Math.ceil(filteredSessions.length / ITEMS_PER_PAGE);
  const paginatedSessions = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return filteredSessions.slice(start, end);
  }, [filteredSessions, currentPage]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1); // 필터 변경 시 1페이지로 리셋
  };

  const handleSessionClick = (session) => {
    if (session.isLive) {
      navigate(`/streaming?session_id=${session.id}`);
    } else {
      window.alert('강연 시간이 아닙니다!');
    }
  };

  const handleToggleSchedule = async (sessionId) => {
    if (!token) {
      window.alert('로그인 후 이용 가능합니다');
      return;
    }
    await toggleSchedule(sessionId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (error) return <div>{error.toString()}</div>;
  if (loading) return <SkeletonAllSessionList />;
  return (
    <>
      <h2 className="text-[2vw] font-bold mb-4">전체 세션</h2>

      <div className="mb-8">
        <SessionFilter onFilterChange={handleFilterChange} token={token} />
      </div>

      <div className="grid place-items-center xl:grid-cols-3 grid-cols-2 gap-8 mb-12">
        {paginatedSessions.map((session) => (
          <AllSessionItem
            key={session.id}
            id={session.id}
            title={session.title}
            thumbnail={session.speaker.image}
            speaker={session.speaker}
            description={session.summary}
            tags={Object.values(session.tags)}
            isScheduled={session.isMySession}
            onToggleSchedule={() => handleToggleSchedule(session.id)}
            onClick={() => handleSessionClick(session)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </>
  );
}
