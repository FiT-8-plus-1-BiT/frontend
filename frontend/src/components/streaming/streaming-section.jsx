import React from 'react';
import { StreamingInformation } from '~/components/streaming/streaming-information';
import { StreamingScreen } from '~/components/streaming/streaming-screen';

const StreamingSection = ({ mode }) => {
  return (
    <div
      className={`flex-1 bg-gray-90 border-[1px] border-gray-200 ${mode ? ' py-[56px] px-[20px]' : ''}`}
    >
      {!mode && <StreamingScreen />}
      <StreamingInformation mode={mode} />
    </div>
  );
};

export { StreamingSection };
