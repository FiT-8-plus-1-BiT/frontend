// src/pages/SpeakerPage.jsx
import React, { useEffect, useState } from 'react';
import { getAllSessions } from '~/api/session/get-all-session';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PresenterStreaming from '~/components/streaming/presenter-streaming'

function SpeakerPage() {
    const [sessions, setSessions] = useState([]);
    const token = useSelector((state) => state.auth.token);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessions = async () => {
            const all = await getAllSessions(token);
            if (all) setSessions(all);
        };

        if (token) fetchSessions();
    }, [token]);

    const handleClick = (sessionId) => {
        navigate(`/speaker?session_id=${sessionId}`);
    };

    return (
        <div style={{ padding: '2rem' }}>
            <h1 className="text-2xl font-bold mb-4">🎙️ 발표자 전용 페이지</h1>
            <p className="mb-4 text-gray-600">발표할 세션을 선택하세요:</p>
            <PresenterStreaming />

            <ul className="space-y-3">
                {sessions.map((session) => (
                    <li
                        key={session.id}
                        className="cursor-pointer p-3 border border-gray-300 rounded hover:bg-blue-50 transition"
                        onClick={() => handleClick(session.id)}
                    >
                        <div className='flex gap-2'>
                        <h1 className="font-semibold">{session.title}</h1>
                        <p className="font-semibold">{session.speaker.name}</p>
                        </div>
                        

                        <p className="text-sm text-gray-500">{session.summary}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SpeakerPage;
