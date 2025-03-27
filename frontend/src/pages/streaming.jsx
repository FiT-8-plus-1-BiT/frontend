import React, { useState } from 'react';
import { StreamingSwitchButton } from '~/components/streaming/streaming-switch-button';
import { StreamingSessionNavbar } from '~/components/streaming/streaming-session-navbar';
import { StreamingChatBox } from '~/components/streaming/streaming-chat-box';
import { StreamingSection } from '~/components/streaming/streaming-section';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {jwtDecode} from "jwt-decode";

export default function Streaming() {
  const [isAudioMode, setIsAudioMode] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  const token = useSelector((state) => state.auth.token);

  const handleToggle = (audioMode) => {
    setIsAudioMode(audioMode);
  };
  const decoded = jwtDecode(token);
  const userId = decoded.sub


  return (
    <div className="flex flex-col md:flex-row gap-[8px]">
      {/* 1. Navbar: 모바일에서는 맨 아래로 */}
      <div className="order-last md:order-none">
        <StreamingSessionNavbar />
      </div>

      {/* 2. 나머지 콘텐츠 */}
      <div className="flex flex-1 flex-col gap-[20px]">
        <StreamingSwitchButton handleToggle={handleToggle} />
        <div className="flex flex-1 gap-[8px] h-full">
          <StreamingSection mode={isAudioMode} />
          <StreamingChatBox mode={isAudioMode} token={token} sessionId={sessionId} userId={userId} />
        </div>
      </div>
    </div>

  );
}
