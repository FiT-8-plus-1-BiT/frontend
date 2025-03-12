import React, { useState } from 'react';
import { SessionItem } from '~/components/session-list/session-item';
import SessionFilter from '~/components/session-list/session-filter';

/**
 * SessionList: 필터링된 세션 아이템을 그리드 형태로 나열
 */
export default function SessionList() {
    // 임의의 예시 데이터
    const sessionData = [
        { id: 1, title: 'AI 세션', category: 'AI', topic: 'Neural Networks', contentType: 'Lecture', level: 'Beginner', tags: ['Machine Learning', 'Deep Learning'], date: '2025-03-12', speaker: '김철수', thumbnail: '' },
        { id: 2, title: '블록체인 강연', category: 'Blockchain', topic: 'Decentralized Finance', contentType: 'Panel Discussion', level: 'Intermediate', tags: ['Web3', 'Cryptocurrency'], date: '2025-03-13', speaker: '이영희', thumbnail: '' },
        { id: 3, title: '디자인 워크숍', category: 'Design', topic: 'User Experience', contentType: 'Workshop', level: 'Advanced', tags: ['Product Design'], date: '2025-03-14', speaker: '박민수', thumbnail: '' },
        { id: 4, title: '클라우드 컴퓨팅', category: 'Cloud', topic: 'Infrastructure', contentType: 'Lecture', level: 'Beginner', tags: ['AWS', 'DevOps'], date: '2025-03-15', speaker: '최지훈', thumbnail: '' },
        { id: 5, title: '보안 강연', category: 'Cybersecurity', topic: 'Network Security', contentType: 'Workshop', level: 'Intermediate', tags: ['Hacking'], date: '2025-03-16', speaker: '윤서현', thumbnail: '' },
        { id: 6, title: '데이터 분석 강연', category: 'Data Science', topic: 'Data Analysis', contentType: 'Lecture', level: 'Advanced', tags: ['Big Data', 'Analytics'], date: '2025-03-17', speaker: '정수빈', thumbnail: '' },
    ];

    // 필터 상태 저장
    const [filters, setFilters] = useState({ category: '', topic: '', contentType: '', level: '', tags: [] });

    // 필터 변경
    const handleFilterChange = (newFilters) => {
        setFilters(newFilters);
    };

    // 필터링된 세션 데이터
    const filteredSessions = sessionData.filter((session) => {
        return (
            (filters.category ? session.category === filters.category : true) &&
            (filters.topic ? session.topic === filters.topic : true) &&
            (filters.contentType ? session.contentType === filters.contentType : true) &&
            (filters.level ? session.level === filters.level : true) &&
            (filters.tags.length > 0 ? filters.tags.every((tag) => session.tags.includes(tag)) : true) // 모든 선택된 태그가 포함된 세션만 표시
        );
    });

    return (
        <div className="flex flex-col items-center min-h-screen py-8">
            {/* 필터 UI */}
            <SessionFilter onFilterChange={handleFilterChange} />

            {/* 필터링된 세션 리스트 */}
            <div className="grid grid-cols-2 gap-x-[8px] gap-y-[40px]" style={{ width: 'calc(768px * 2 + 8px)', gridAutoRows: '740px' }}>
                {filteredSessions.map((session) => (
                    <SessionItem key={session.id} {...session} />
                ))}
            </div>
        </div>
    );
}
