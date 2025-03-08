import { useState } from 'react';

function InputWithSelect() {
  const [selected, setSelected] = useState('질문하기');
  const [isOpen, setIsOpen] = useState(false);
  const options = ['질문하기', '채팅하기'];

  return (
    <div className="relative flex items-center w-full p-2 border rounded-lg bg-white">
      {/* Select 버튼 */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center px-3 py-2 bg-white border rounded-md shadow-sm text-sm font-medium text-gray-700"
        >
          {selected}
          <svg
            className="ml-2 w-4 h-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {/* 드롭다운 */}
        {isOpen && (
          <ul className="absolute left-0 mt-2 w-32 bg-white border rounded-lg shadow-lg z-10">
            {options.map((option, idx) => (
              <li
                key={idx}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  setSelected(option);
                  setIsOpen(false);
                }}
              >
                {option}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* 채팅 입력 필드 */}
      <input
        type="text"
        placeholder="채팅을 입력해주세요"
        className="flex-1 px-3 py-2 ml-2 border rounded-md focus:ring-2 focus:ring-blue-500 text-gray-700"
      />
    </div>
  );
}

function StreamingChatBox({ mode }) {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const questions = [
    {
      id: 1,
      username: 'username1',
      time: 'TT:MM',
      content: 'texttexttext1',
      isActive: true,
      rating: 'n.nn',
    },
    {
      id: 2,
      username: 'username2',
      time: 'TT:MM',
      content: 'texttexttext2',
      isActive: false,
      rating: 'n.nn',
    },
    {
      id: 3,
      username: 'username3',
      time: 'TT:MM',
      content: 'texttexttext3',
      isActive: false,
      rating: 'n.nn',
    },
    {
      id: 4,
      username: 'username4',
      time: 'TT:MM',
      content: 'texttexttext4',
      isActive: false,
      rating: 'n.nn',
    },
    // 추가 데이터...
  ];

  const chatRecords = [
    {
      id: 1,
      time: 'TT:MM',
      username: 'userA',
      content: 'chat message A',
      rating: 'n.nn',
    },
    {
      id: 2,
      time: 'TT:MM',
      username: 'userB',
      content: 'chat message B',
      rating: 'n.nn',
    },
    {
      id: 3,
      time: 'TT:MM',
      username: 'userC',
      content: 'chat message C',
      rating: 'n.nn',
    },
    {
      id: 4,
      time: 'TT:MM',
      username: 'userD',
      content: 'chat message D',
      rating: 'n.nn',
    },
    {
      id: 3,
      time: 'TT:MM',
      username: 'userC',
      content: 'chat message C',
      rating: 'n.nn',
    },
    {
      id: 4,
      time: 'TT:MM',
      username: 'userD',
      content: 'chat message D',
      rating: 'n.nn',
    },
    // 추가 데이터...
  ];

  return (
    <div
      className={`flex flex-col h-[768px] border border-gray-300 bg-white rounded-md shadow-md transition-all duration-300 ease-in-out ${mode
          ? "w-[50%]"
          : isChatOpen
            ? "w-[404px]"
            : "w-16 ml-auto"
        }`}
    >

      {/* 상단 바 (항상 보임) */}
      <div className="flex items-center h-[54px] p-3 border-b-2 border-[#e0e1e4] justify-between">
        {/* 접기/펼치기 버튼 */}
        <button
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-10 h-10 flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`text-black transition-transform duration-300  ${isChatOpen ? 'scale-x-[-1]' : 'scale-x-100'
              }`}
          >
            <path
              d="M13.0332 17.9999L7.1999 11.9999M7.1999 11.9999L13.0332 5.9999M7.1999 11.9999H21.5999M2.3999 2.3999V21.5999"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* 중앙 제목 (보이는 경우에만 렌더링) */}
        {isChatOpen && (
          <div className="text-[#0d0d0d] text-xl font-bold leading-[30px]">
            채팅
          </div>
        )}

        {/* 추가 기능 버튼 (항상 보임) */}
        {isChatOpen && (
          <button className="w-10 h-10 flex items-center justify-center">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-black"
            >
              <circle cx="12" cy="6" r="2" fill="currentColor" />
              <circle cx="12" cy="12" r="2" fill="currentColor" />
              <circle cx="12" cy="18" r="2" fill="currentColor" />
            </svg>
          </button>
        )}
      </div>

      {/* 내부 콘텐츠: 인기질문, 채팅기록, 입력창 */}
      {isChatOpen && (
        <>
          {/* 중간 영역: 스크롤 가능한 콘텐츠 */}
          <div className="flex-1 p-4 flex flex-col overflow-hidden">
            {/* 인기질문 영역 (최대 220px 높이, 스크롤) */}
            <div className="mb-3 font-semibold text-[#131212]">인기질문</div>
            <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto scrollbar-hide">
              {questions.map((q) => (
                <div
                  key={q.id}
                  className="flex justify-between items-center bg-white/[0.9] p-2 rounded-md border border-gray-200"
                >
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-700">
                        {q.username}
                      </span>
                      <span className="text-xs text-gray-500">{q.time}</span>
                    </div>
                    <span className="text-xl font-medium text-blue-600">
                      {q.content}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.53751 4.63757C3.1376 4.03766 3.95139 3.70065 4.79992 3.70065C5.64844 3.70065 6.46223 4.03766 7.06233 4.63757L7.99993 5.57437L8.93753 4.63757C9.23272 4.33193 9.58583 4.08815 9.97624 3.92044C10.3667 3.75273 10.7866 3.66446 11.2115 3.66077C11.6364 3.65707 12.0577 3.73804 12.451 3.89894C12.8443 4.05984 13.2016 4.29745 13.502 4.5979C13.8025 4.89836 14.0401 5.25565 14.201 5.64891C14.3619 6.04218 14.4428 6.46356 14.4392 6.88845C14.4355 7.31334 14.3472 7.73325 14.1795 8.12366C14.0118 8.51407 13.768 8.86718 13.4624 9.16237L7.99993 14.6256L2.53751 9.16237C1.9376 8.56228 1.60059 7.74849 1.60059 6.89997C1.60059 6.05144 1.9376 5.23766 2.53751 4.63757Z"
                        fill="#9FA0A3"
                        stroke="#9FA0A3"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-xs text-gray-500">{q.rating}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* 채팅기록 영역 (남은 공간, 스크롤) */}
            <div className="mt-4 font-semibold text-[#131212]">채팅기록</div>
            <div className="flex-1 mt-2 overflow-y-auto flex flex-col gap-2 scrollbar-hide">
              {chatRecords.map((record) => (
                <div
                  key={record.id}
                  className="flex justify-between items-center p-2 rounded-md border border-gray-200"
                >
                  {/* 왼쪽 메시지 */}
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500">
                        {record.time}
                      </span>
                      <span className="text-base font-semibold text-gray-800">
                        {record.username}
                      </span>
                      <span className="text-base font-medium text-gray-800">
                        :
                      </span>
                    </div>
                    <span className="text-base text-gray-800">
                      {record.content}
                    </span>
                  </div>
                  {/* 오른쪽 좋아요 표시 */}
                  <div className="flex items-center gap-1">
                    <svg
                      width="16"
                      height="17"
                      viewBox="0 0 16 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M2.53751 4.63757C3.1376 4.03766 3.95139 3.70065 4.79992 3.70065C5.64844 3.70065 6.46223 4.03766 7.06233 4.63757L7.99993 5.57437L8.93753 4.63757C9.23272 4.33193 9.58583 4.08815 9.97624 3.92044C10.3667 3.75273 10.7866 3.66446 11.2115 3.66077C11.6364 3.65707 12.0577 3.73804 12.451 3.89894C12.8443 4.05984 13.2016 4.29745 13.502 4.5979C13.8025 4.89836 14.0401 5.25565 14.201 5.64891C14.3619 6.04218 14.4428 6.46356 14.4392 6.88845C14.4355 7.31334 14.3472 7.73325 14.1795 8.12366C14.0118 8.51407 13.768 8.86718 13.4624 9.16237L7.99993 14.6256L2.53751 9.16237C1.9376 8.56228 1.60059 7.74849 1.60059 6.89997C1.60059 6.05144 1.9376 5.23766 2.53751 4.63757Z"
                        fill="#9FA0A3"
                        stroke="#9FA0A3"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="text-xs text-gray-500">
                      {record.rating}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* 하단 입력창 */}
          <div className="p-3">
            <InputWithSelect />
          </div>
        </>
      )}
    </div>
  );
}

export { StreamingChatBox };
