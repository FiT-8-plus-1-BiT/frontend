import React, { useState } from 'react';
import { StreamingSwitchButton } from '~/components/streaming/streaming-switch-button';
import { StreamingSessionNavbar } from '~/components/streaming/streaming-session-navbar';
import { StreamingChatBox } from '~/components/streaming/streaming-chat-box';
import { StreamingSection } from '~/components/streaming/streaming-section';

export default function Streaming() {
  const [isAudioMode, setIsAudioMode] = useState(false);

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
          <StreamingChatBox mode={isAudioMode} />
        </div>
      </div>
    </div>
  );
}
