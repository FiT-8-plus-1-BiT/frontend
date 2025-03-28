import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import SessionFilter from '~/components/session-list/session-filter';
import { AllSessionItem } from '~/components/session-list/all-session-item';
import { useAllSessionsWithSchedule } from '~/hooks/session/use-all-sessions-with-schedule';

export default function AllSessionList({ token }) {
  const [filters, setFilters] = useState({
    category: '',
    topic: '',
    contentType: '',
    level: '',
  });

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

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSessionClick = (id) => {
    navigate(`/streaming?session_id=${id}`);
  };

  const handleToggleSchedule = async (sessionId) => {
    if (!token) {
      window.alert('로그인 후 이용 가능합니다');
      return;
    }
    await toggleSchedule(sessionId);
  };

  if (loading) return <div>Loading sessions...</div>;
  if (error) return <div>{error.toString()}</div>;

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">전체 세션</h2>

      <div className="mb-8">
        <SessionFilter onFilterChange={handleFilterChange} token={token} />
      </div>

      <div className="grid place-items-center xl:grid-cols-3 grid-cols-2 gap-8 mb-12">
        {filteredSessions.map((session) => (
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
            onClick={() => handleSessionClick(session.id)}
          />
        ))}
      </div>
    </>
  );
}
