import React, { useState } from 'react';
import { StreamingSwitchButton } from '~/components/streaming/streaming-switch-button';
import { StreamingSessionNavbar } from '~/components/streaming/streaming-session-navbar';
import { StreamingChatBox } from '~/components/chatting/streaming-chat-box';
import { StreamingSection } from '~/components/streaming/streaming-section';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { jwtDecode } from 'jwt-decode';
import { useCreateChatSession } from '~/hooks/chat/use-make-chattingroom';

export default function Streaming() {
  const [isAudioMode, setIsAudioMode] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  const token = useSelector((state) => state.auth.token);
  const decoded = jwtDecode(token);
  const userId = decoded.sub;

  // ✅ 여기서 자동 생성됨
  useCreateChatSession(sessionId, token);

  const handleToggle = (audioMode) => {
    setIsAudioMode(audioMode);
  };

  return (
    <div className="flex flex-col md:flex-row gap-[8px]">
      <div className="order-last md:order-none">
        <StreamingSessionNavbar />
      </div>
      <div className="flex flex-1 flex-col gap-[20px]">
        <StreamingSwitchButton handleToggle={handleToggle} />
        <div className="flex flex-1 gap-[8px] h-full">
          <StreamingSection mode={isAudioMode} />
          <StreamingChatBox
            mode={isAudioMode}
            token={token}
            sessionId={sessionId}
            userId={userId}
          />
        </div>
      </div>
    </div>
  );
}
