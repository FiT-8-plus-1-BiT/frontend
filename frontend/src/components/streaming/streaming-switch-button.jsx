import React, { useState } from "react";

const SwitchButton = ({ label, active, onClick }) => {
  return (
    <button
      className={`py-2 border text-s font-bold transition w-[170px] md:w-[124px] ${
        active ? "bg-black text-white " : " text-black"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const StreamingSwitchButton = ({ handleToggle }) => {
  const [activeButton, setActiveButton] = useState("live");

  return (
    <div className="mt-[28px] flex gap-2">
      <SwitchButton
        label="오디오 청취"
        active={activeButton === "audio"}
        onClick={() => {
          setActiveButton("audio");
          handleToggle(true); // 오디오 청취 모드 활성화
        }}
      />
      <SwitchButton
        label="라이브 영상 시청"
        active={activeButton === "live"}
        onClick={() => {
          setActiveButton("live");
          handleToggle(false); // 라이브 영상 모드 활성화
        }}
      />
    </div>
  );
};

export { StreamingSwitchButton };
