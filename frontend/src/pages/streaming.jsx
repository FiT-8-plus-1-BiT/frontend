import React, { useState } from 'react';
import { StreamingSwitchButton } from '~/components/streaming/streaming-switch-button';
import { StreamingSessionNavbar } from '~/components/streaming/streaming-session-navbar';
import { StreamingChatBox } from '~/components/streaming/streaming-chat-box';
import { StreamingSection } from '~/components/streaming/streaming-section';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Streaming() {
  const [isAudioMode, setIsAudioMode] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const sessionId = queryParams.get('session_id');
  const userId = useSelector((state) => state.auth.userId);

  const handleToggle = (audioMode) => {
    setIsAudioMode(audioMode);
  };

  return (
    <div className="flex gap-[8px]">
      <StreamingSessionNavbar />
      <div className="flex flex-1 flex-col gap-[20px]">
        {/* 상태 변경 버튼 */}
        <StreamingSwitchButton handleToggle={handleToggle} />
        <div className="flex flex-1 gap-[8px] h-full">
          <StreamingSection mode={isAudioMode} />
          <StreamingChatBox mode={isAudioMode} sessionId={sessionId} userId={userId} />
        </div>
      </div>
    </div>
  );
}
