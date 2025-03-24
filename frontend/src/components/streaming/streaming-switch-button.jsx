import React, { useState } from 'react';

const SwitchButton = ({ label, active, onClick, width }) => {
  return (
    <button
      className={`h-[46px] border font-bold transition 
        ${width} 
        md:text-xl text-xs 
        ${active ? 'bg-black text-white' : 'text-black'}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const StreamingSwitchButton = ({ handleToggle }) => {
  const [activeButton, setActiveButton] = useState('live');

  return (
    <div className="mt-[28px] flex gap-2">
      <SwitchButton
        label="오디오 청취"
        active={activeButton === 'audio'}
        width="md:w-[170px] w-[124px]"
        onClick={() => {
          setActiveButton('audio');
          handleToggle(true);
        }}
      />
      <SwitchButton
        label="라이브 영상 시청"
        active={activeButton === 'live'}
        width="md:w-[204px] w-[148px]"
        onClick={() => {
          setActiveButton('live');
          handleToggle(false);
        }}
      />
    </div>
  );
};

export { StreamingSwitchButton };
