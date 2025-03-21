import React, { useState, useEffect } from 'react';
import { SessionItem } from '~/components/session-list/session-item';
import SessionFilter from '~/components/session-list/session-filter';
import { getAllSessions } from '~/api/session/get-all-session'; // 👈 아까 만든 fetch 함수 불러오기
import { getLiveSessions } from '~/api/session/get-live-session';

export default function SessionList() {
  const [sessions, setSessions] = useState([]);
  const [liveSessions, setLiveSessions] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    topic: '',
    contentType: '',
    level: '',
    tags: [],
  });

  // ⭐️ API로 세션 불러오기
  useEffect(() => {
    const fetchData = async () => {
      const content = await getAllSessions(); // ← response.content 배열만 리턴하도록 구성했었죠?
      const sessions = await getLiveSessions();
      setLiveSessions(sessions);
      console.log(liveSessions);
      const mapped = content.map((s) => ({
        id: s.id,
        title: s.title,
        category: s.tags?.field || '', // ← 'BE', 'FE' 같은 필드
        topic: s.tags?.topic || '', // ← '리액트', 'ML/DS'
        contentType: s.tags?.type || '', // ← '워크샵'
        level: s.tags?.level || '', // ← '초급', '고급'
        tags: [], // ← 서버에서 따로 없으니 빈 배열로
        date: '', // ← 응답에 날짜 없음
        speaker: s.speaker?.name || '',
        thumbnail: s.speaker?.image || '',
        description: s.summary || '',
      }));
      setSessions(mapped);
    };

    fetchData();
  }, []);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredSessions = sessions.filter((session) => {
    return (
      (filters.category ? session.category === filters.category : true) &&
      (filters.topic ? session.topic === filters.topic : true) &&
      (filters.contentType
        ? session.contentType === filters.contentType
        : true) &&
      (filters.level ? session.level === filters.level : true) &&
      (filters.tags.length > 0
        ? filters.tags.every((tag) => session.tags.includes(tag))
        : true)
    );
  });

  return (
    <div className="flex flex-col min-h-screen pt-24 py-8 mx-[160px]">
      <div>현재 라이브중인 세션</div>
      <div
        className="grid grid-cols-3 gap-x-[8px] gap-y-[40px]"
        style={{ width: 'calc(768px * 2 + 8px)', gridAutoRows: '740px' }}
      >
        {liveSessions.map((session) => (
          <SessionItem
            key={session.id}
            id={session.id}
            title={session.title}
            summary={session.summary}
            speaker={session.speaker}
            tags={Object.values(session.tags).filter(Boolean)} // tags를 배열로 변환
          />
        ))}
      </div>
      <div className="flex">
        <SessionFilter onFilterChange={handleFilterChange} />
      </div>

      <div
        className="grid grid-cols-3 gap-x-[8px] gap-y-[40px]"
        style={{ width: 'calc(768px * 2 + 8px)', gridAutoRows: '740px' }}
      >
        {filteredSessions.map((session) => (
          <SessionItem key={session.id} {...session} />
        ))}
      </div>
    </div>
  );
}
