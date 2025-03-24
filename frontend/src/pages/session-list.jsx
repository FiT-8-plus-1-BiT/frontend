import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionItem } from '~/components/session-list/session-item';
import SessionFilter from '~/components/session-list/session-filter';
import { getAllSessions } from '~/api/session/get-all-session'; 
import { getLiveSessions } from '~/api/session/get-live-session';

export default function SessionList() {
  // 모든 세션
  const [sessions, setSessions] = useState([]);
  // 라이브 세션
  const [liveSessions, setLiveSessions] = useState([]);
  // 필터링 기준
  const [filters, setFilters] = useState({
    category: '',
    topic: '',
    contentType: '',
    level: '',
    tags: [],
  });

  const navigate = useNavigate();

  // 데이터 페칭
  useEffect(() => {
    const fetchData = async () => {
      try {
        // 병렬 요청으로 API 호출
        const [all, live] = await Promise.all([
          getAllSessions(),
          getLiveSessions(),
        ]);

        // 라이브 세션 상태 업데이트
        setLiveSessions(live);
        console.log(liveSessions)
        // 전체 세션 데이터 구조 변환
        const mapped = all.map((s) => ({
          id: s.id,
          title: s.title,
          category: s.tags?.field || '',  // 예: 'BE', 'FE'
          topic: s.tags?.topic || '',     // 예: 'React', 'ML/DS'
          contentType: s.tags?.type || '',// 예: '워크샵'
          level: s.tags?.level || '',     // 예: '초급', '고급'
          tags: s.tags,                       // 서버에서 별도 태그 배열 없어서 빈 배열
          date: '',                       // 날짜 데이터가 없다면 ''
          speaker: s.speaker?.name || '',
          thumbnail: s.speaker?.image || '',
          description: s.summary || '',
        }));

        setSessions(mapped);
      } catch (error) {
        console.error('세션 데이터를 불러오는 중 에러:', error);
      }
    };

    fetchData();
  }, []);

  // 필터 변경 시
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  // 필터 적용된 전체 세션
  const filteredSessions = useMemo(() => {
    return sessions.filter((session) => {
      return (
        (filters.category ? session.category === filters.category : true) &&
        (filters.topic ? session.topic === filters.topic : true) &&
        (filters.contentType ? session.contentType === filters.contentType : true) &&
        (filters.level ? session.level === filters.level : true) &&
        (filters.tags.length > 0
          ? filters.tags.every((tag) => session.tags.includes(tag))
          : true)
      );
    });
  }, [sessions, filters]);

  // 세션 클릭 시 스트리밍 페이지 이동
  const handleSessionClick = (id) => {
    navigate(`/streaming?session_id=${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen mx-[8.4vw] pt-24 py-8">
      {/* 현재 라이브 중인 세션 섹션 */}
      <h2 className="text-2xl font-bold mb-4">현재 라이브 중인 세션</h2>
      <div className="grid justify-item-center xl:grid-cols-3  grid-cols-2  gap-8 mb-12">
        {liveSessions.map((session) => (
          <SessionItem
            key={session.id}
            id={session.id}
            title={session.title}
            summary={session.description}
            speaker={session.speaker}
            // 서버에 별도 tag 데이터가 없다면, 필요 시 session.tags를 넣어주거나, 
            // 아래처럼 객체를 배열로 변환해도 무방
            tags={Object.values(session.tags || {}).filter(Boolean)}
            onClick={() => handleSessionClick(session.id)}
          />
        ))}
      </div>

      {/* 전체 세션 섹션 (필터 포함) */}
      <h2 className="text-2xl font-bold mb-4">전체 세션</h2>

      {/* 필터 컴포넌트 */}
      <div className="mb-8">
        <SessionFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="grid place-items-center xl:grid-cols-3 grid-cols-2 gap-8 mb-12">
        {filteredSessions.map((session) => (
          <SessionItem
            key={session.id}
            {...session}
            onClick={() => handleSessionClick(session.id)}
          />
        ))}
      </div>
    </div>
  );
}
