import React from 'react';
import { StreamingInformation } from '~/components/streaming/streaming-information';
import { StreamingScreen } from '~/components/streaming/streaming-screen';

const StreamingSection = ({ mode }) => {
  return (
    <div
      className={`flex-1 bg-gray-90  ${mode ? 'h-[42.6vw] border-[1px] pt-6 px-6 border-gray-200' : ''}`}
    >
      {!mode && <StreamingScreen />}
      <StreamingInformation mode={mode} />
    </div>
  );
};

export { StreamingSection };
