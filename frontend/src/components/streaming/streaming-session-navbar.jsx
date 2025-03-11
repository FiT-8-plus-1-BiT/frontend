import React, { useState } from 'react';

const SessionItem = ({ sessionName, speakerName }) => {
  return (
    <div className="flex items-center gap-2 w-[128px ] py-2 bg-white">
      {/* 아이콘 (24px x 24px, radius 5px) */}
      <div className="w-6 h-6 bg-[#e0e1e4] rounded-[5px] flex justify-center items-center">
        {/* SVG 아이콘 자리 */}
      </div>

      {/* 세션 정보 */}
      <div className="flex flex-col">
        <span className="text-[#2c2e31] text-sm font-semibold leading-[150%]">
          {sessionName}
        </span>
        <span className="text-[#9fa0a3] text-xs font-medium leading-[150%]">
          {speakerName}
        </span>
      </div>
    </div>
  );
};

const StreamingSessionNavbar = () => {
  const [selectedSession, setSelectedSession] = useState('전체세션');

  const sessionList = ['전체세션', '인기세션', '추천세션'];

  const mockData = {
    전체세션: [
      { id: "1", sessionName: '세션 1', speakerName: '스피커 A' },
      { id: "2", sessionName: '세션 2', speakerName: '스피커 B' },
    ],
    인기세션: [
      { id: "3", sessionName: '인기 세션 1', speakerName: '스피커 C' },
      { id: "4", sessionName: '인기 세션 2', speakerName: '스피커 D' },
      { id: "5", sessionName: '인기 세션 3', speakerName: '스피커 E' },
      { id: "6", sessionName: '인기 세션 4', speakerName: '스피커 F' },
      { id: "7", sessionName: '인기 세션 5', speakerName: '스피커 G' },
      { id: "8", sessionName: '인기 세션 6', speakerName: '스피커 H' },
      { id: "9", sessionName: '인기 세션 7', speakerName: '스피커 I' },
      { id: "10", sessionName: '인기 세션 8', speakerName: '스피커 J' },
      { id: "11", sessionName: '인기 세션 9', speakerName: '스피커 K' },
      { id: "12", sessionName: '인기 세션 10', speakerName: '스피커 L' },
      { id: "13", sessionName: '인기 세션 11', speakerName: '스피커 M' },
      { id: "14", sessionName: '인기 세션 12', speakerName: '스피커 N' },
      { id: "15", sessionName: '인기 세션 13', speakerName: '스피커 O' },
      { id: "16", sessionName: '인기 세션 14', speakerName: '스피커 P' },
    ],
    추천세션: [
      { id: "17", sessionName: '추천 세션 1', speakerName: '스피커 E' },
      { id: "18", sessionName: '추천 세션 2', speakerName: '스피커 F' },
    ],
  };
  
  return (
    <div className="mt-[28px] flex flex-col bg-white border-b border-gray-300 h-[768px] min-w-[152px]  ">
      {/* 세션 선택 Navbar */}
      <div className="flex flex-col  bg-white ">
        {sessionList.map((session) => (
          <button
            key={session}
            className={`flex items-center py-[16px] pl-[16px] pr-[24px] gap-[12px] rounded-md transition 
                        ${selectedSession === session ? 'text-blue-600' : 'text-gray-700'}`}
            onClick={() => setSelectedSession(session)}
          >
            <div className="w-6 h-6 bg-[#131212] rounded-[5px]"></div>
            <span className="text-sm font-semibold leading-[140%]">
              {session}
            </span>
          </button>
        ))}
      </div>

      {/* 선택된 세션 표시 */}
      <div className="state-layer flex  gap-3 pt-4 pb-2 pl-4 pr-6 border-t border-gray-300 text-[#797677] text-sm font-semibold">
        {selectedSession}
      </div>

      {/* Mock Data 세로 출력 */}
      <div className="flex flex-col gap-[8px] px-[12px] scrollbar-hide overflow-y-auto">
        {mockData[selectedSession].map((session, index) => (
          <SessionItem
            key={index}
            sessionName={session.sessionName}
            speakerName={session.speakerName}
          />
        ))}
      </div>
    </div>
  );
};

export { StreamingSessionNavbar };
