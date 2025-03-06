import React, { useState } from "react";

const SessionItem = ({ sessionName, speakerName }) => {
  return (
    <div className="flex items-center gap-2 w-[136px] py-2 px-3 bg-white">
      {/* 아이콘 (24px x 24px, radius 5px) */}
      <div className="w-6 h-6 bg-[#e0e1e4] rounded-[5px] flex justify-center items-center">
        {/* SVG 아이콘 자리 */}
      </div>

      {/* 세션 정보 */}
      <div className="flex flex-col">
        <span className="text-[#2c2e31] text-sm font-semibold leading-[150%]">{sessionName}</span>
        <span className="text-[#9fa0a3] text-xs font-medium leading-[150%]">{speakerName}</span>
      </div>
    </div>
  );
};

const StreamingSessionNavbar = () => {
  const [selectedSession, setSelectedSession] = useState("전체세션");

  const sessionList = ["전체세션", "인기세션", "추천세션"];

  const mockData = {
    "전체세션": [
      { sessionName: "세션 1", speakerName: "스피커 A" },
      { sessionName: "세션 2", speakerName: "스피커 B" },
    ],
    "인기세션": [
      { sessionName: "인기 세션 1", speakerName: "스피커 C" },
      { sessionName: "인기 세션 2", speakerName: "스피커 D" },
    ],
    "추천세션": [
      { sessionName: "추천 세션 1", speakerName: "스피커 E" },
      { sessionName: "추천 세션 2", speakerName: "스피커 F" },
    ],
  };

  return (
    <div className="py-3 px-1 bg-white border-b border-gray-300 min-w-[152px]">
      {/* 세션 선택 Navbar */}
      <div className="flex flex-col items-center gap-3 bg-white">
        {sessionList.map((session) => (
          <button
            key={session}
            className={`flex items-center gap-3 py-3 px-4 rounded-md transition 
                        ${selectedSession === session ? "text-blue-600" : "text-gray-700"}`}
            onClick={() => setSelectedSession(session)}
          >
            <div className="w-6 h-6 bg-[#131212] rounded-[5px]"></div>
            <span className="text-sm font-semibold leading-[140%]">{session}</span>
          </button>
        ))}
      </div>

      {/* 선택된 세션 표시 */}
      <div className="state-layer flex items-center gap-3 pt-4 pb-2 pl-4 pr-6 border-t border-gray-300 text-[#797677] text-sm font-semibold">
        {selectedSession}
      </div>

      {/* Mock Data 세로 출력 */}
      <div className="flex flex-col gap-2">
        {mockData[selectedSession].map((session, index) => (
          <SessionItem key={index} sessionName={session.sessionName} speakerName={session.speakerName} />
        ))}
      </div>
    </div>
  );
};

export { StreamingSessionNavbar };
