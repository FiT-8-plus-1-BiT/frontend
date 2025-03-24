import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { SessionItem } from '~/components/session-list/session-item';
import SessionFilter from '~/components/session-list/session-filter';
import { getAllSessions } from '~/api/session/get-all-session';
import { getLiveSessions } from '~/api/session/get-live-session';
import { useScheduledSessions } from '~/hooks/session/use-scheduled-session';
import {
  addSessionToSchedule,
  removeSessionFromSchedule,
} from '~/api/session/session-to-schedule';
import { useSelector } from 'react-redux';

export default function SessionList() {
  const token = useSelector((state) => state.auth.token); // auth 슬라이스에서 token 꺼냄

  const { scheduledSessions, setScheduledSessions } =
    useScheduledSessions(token);
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
        console.log(liveSessions);
        // 전체 세션 데이터 구조 변환
        const mapped = all.map((s) => ({
          id: s.id,
          title: s.title,
          category: s.tags?.field || '', // 예: 'BE', 'FE'
          topic: s.tags?.topic || '', // 예: 'React', 'ML/DS'
          contentType: s.tags?.type || '', // 예: '워크샵'
          level: s.tags?.level || '', // 예: '초급', '고급'
          tags: s.tags, // 서버에서 별도 태그 배열 없어서 빈 배열
          date: '', // 날짜 데이터가 없다면 ''
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
        (filters.contentType
          ? session.contentType === filters.contentType
          : true) &&
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

  // ✅ 담기 토글 (이미 담은 세션이면 취소, 아니면 담기)
  const handleToggleSchedule = async (sessionId) => {
    // scheduledSessions에는 { sessionId: 1, title: ... } 이런 형태일 수도 있음
    const isScheduled = scheduledSessions.some(
      (s) => s.sessionId === sessionId,
    );
    if (!token) {
      window.alert('로그인 후 이용 가능합니다');
    }

    if (isScheduled) {
      // 이미 담았으니 -> 취소
      const success = await removeSessionFromSchedule(token, sessionId);
      if (success) {
        setScheduledSessions((prev) =>
          prev.filter((session) => session.sessionId !== sessionId),
        );
      }
    } else {
      // 안 담았으니 -> 담기
      const success = await addSessionToSchedule(token, sessionId);
      if (success) {
        // 성공하면 다시 fetch해도 되고, 임시로 push도 가능
        setScheduledSessions((prev) => [
          ...prev,
          { sessionId, title: '임시' }, // title 등 필요한 데이터 있으면 더 넣기
        ]);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen mx-[8.4vw] pt-24 py-8">
      {/* 현재 라이브 중인 세션 */}
      <h2 className="text-2xl font-bold mb-4">현재 라이브 중인 세션</h2>
      <div className="grid justify-item-center xl:grid-cols-3 grid-cols-2 gap-8 mb-12">
        {liveSessions.map((session) => {
          const isScheduled = scheduledSessions.some(
            (s) => s.sessionId === session.id,
          );
          return (
            <SessionItem
              key={session.id}
              id={session.id}
              title={session.title}
              thumbnail={session.thumbnail}
              speaker={session.speaker}
              description={session.description}
              tags={session.tags}
              isScheduled={isScheduled} // 현재 담은 세션 여부
              onToggleSchedule={handleToggleSchedule}
              onClick={() => handleSessionClick(session.id)}
            />
          );
        })}
      </div>

      {/* 전체 세션 섹션 */}
      <h2 className="text-2xl font-bold mb-4">전체 세션</h2>
      <div className="mb-8">
        <SessionFilter onFilterChange={handleFilterChange} />
      </div>

      <div className="grid place-items-center xl:grid-cols-3 grid-cols-2 gap-8 mb-12">
        {filteredSessions.map((session) => {
          const isScheduled = scheduledSessions.some(
            (s) => s.sessionId === session.id,
          );
          return (
            <SessionItem
              key={session.id}
              id={session.id}
              title={session.title}
              thumbnail={session.thumbnail}
              speaker={session.speaker}
              description={session.description}
              tags={session.tags}
              isScheduled={isScheduled}
              onToggleSchedule={handleToggleSchedule}
              onClick={() => handleSessionClick(session.id)}
            />
          );
        })}
      </div>
    </div>
  );
}
