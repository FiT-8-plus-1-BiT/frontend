import React, { useState } from "react";

const SwitchButton = ({ label, active, onClick }) => {
  return (
    <button
      className={`px-5 py-2 rounded-full border text-xl font-bold transition ${
        active ? "bg-[#373de7] text-white border-[#373de7]" : "border-[#373de7] text-[#373de7]"
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const StreamingSwitchButton = () => {
  const [activeButton, setActiveButton] = useState("live");

  return (
    <div className="pt-6 pb-3 ml-48 flex gap-2">
      <SwitchButton 
        label="오디오 청취" 
        active={activeButton === "audio"} 
        onClick={() => setActiveButton("audio")} 
      />
      <SwitchButton 
        label="라이브 영상 시청" 
        active={activeButton === "live"} 
        onClick={() => setActiveButton("live")} 
      />
    </div>
  );
};

export { StreamingSwitchButton };
