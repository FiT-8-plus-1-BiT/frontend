import { useState, useCallback } from 'react';

// 컴포넌트 외부에 상수 데이터를 정의하여 매 렌더마다 재생성되지 않도록 함
const OPTIONS = ['질문하기', '채팅하기'];

// 각 메시지에 type을 추가해 'chat'인지 'question'인지 구분
const messages = [
  {
    type: "question",
    messageId: "msg001",
    sender: "user1",
    content: "이 문제를 해결하는 가장 좋은 방법은 무엇인가요?",
    timestamp: "2025-03-10T12:01:00Z",
    likes: 3,
    likedByUser: false
  },
  {
    type: "chat",
    messageId: "msg002",
    sender: "user2",
    content: "그 문제는 알고리즘을 최적화하는 게 중요합니다.",
    timestamp: "2025-03-10T12:02:00Z"
  },
  {
    type: "chat",
    messageId: "msg003",
    sender: "user3",
    content: "어떤 알고리즘을 사용했나요?",
    timestamp: "2025-03-10T12:03:00Z"
  },
  {
    type: "question",
    messageId: "msg004",
    sender: "user4",
    content: "이 코드에서 버그를 찾을 수 있나요?",
    timestamp: "2025-03-10T12:04:00Z",
    likes: 5,
    likedByUser: true
  },
  {
    type: "chat",
    messageId: "msg005",
    sender: "user5",
    content: "코드 공유해주시면 같이 봐드릴게요.",
    timestamp: "2025-03-10T12:05:00Z"
  },
  {
    type: "question",
    messageId: "msg006",
    sender: "user6",
    content: "STOMP 프로토콜에서 메시지 손실이 발생할 수도 있나요?",
    timestamp: "2025-03-10T12:06:00Z",
    likes: 2,
    likedByUser: false
  },
  {
    type: "chat",
    messageId: "msg007",
    sender: "user7",
    content: "STOMP는 TCP 기반이라 손실은 없지만, 클라이언트가 끊기면 메시지를 놓칠 수 있어요.",
    timestamp: "2025-03-10T12:07:00Z"
  },
  {
    type: "question",
    messageId: "msg008",
    sender: "user8",
    content: "WebSocket 연결이 자주 끊기는 원인이 뭘까요?",
    timestamp: "2025-03-10T12:08:00Z",
    likes: 4,
    likedByUser: true
  },
  {
    type: "chat",
    messageId: "msg009",
    sender: "user9",
    content: "네트워크 상태가 불안정하거나 서버 타임아웃 설정이 짧을 수도 있습니다.",
    timestamp: "2025-03-10T12:09:00Z"
  },
  {
    type: "chat",
    messageId: "msg010",
    sender: "user10",
    content: "일반적으로 핑 메시지를 보내서 연결을 유지하는 방법이 있어요.",
    timestamp: "2025-03-10T12:10:00Z"
  },
  {
    type: "question",
    messageId: "msg011",
    sender: "user11",
    content: "Spring Boot에서 STOMP를 어떻게 설정하나요?",
    timestamp: "2025-03-10T12:11:00Z",
    likes: 6,
    likedByUser: false
  },
  {
    type: "chat",
    messageId: "msg012",
    sender: "user12",
    content: "WebSocket 설정을 추가하고, STOMP 메시지 핸들러를 구현해야 합니다.",
    timestamp: "2025-03-10T12:12:00Z"
  },
  {
    type: "question",
    messageId: "msg013",
    sender: "user13",
    content: "WebSocket과 HTTP의 차이는 뭔가요?",
    timestamp: "2025-03-10T12:13:00Z",
    likes: 8,
    likedByUser: true
  },
  {
    type: "chat",
    messageId: "msg014",
    sender: "user14",
    content: "HTTP는 요청-응답 방식이고, WebSocket은 실시간 양방향 통신이 가능해요.",
    timestamp: "2025-03-10T12:14:00Z"
  },
  {
    type: "chat",
    messageId: "msg015",
    sender: "user15",
    content: "그래서 채팅 같은 서비스에 WebSocket이 많이 사용됩니다.",
    timestamp: "2025-03-10T12:15:00Z"
  },
  {
    type: "question",
    messageId: "msg016",
    sender: "user16",
    content: "WebSocket 서버에서 클라이언트 인증은 어떻게 하나요?",
    timestamp: "2025-03-10T12:16:00Z",
    likes: 7,
    likedByUser: false
  },
  {
    type: "chat",
    messageId: "msg017",
    sender: "user17",
    content: "JWT 토큰을 사용해서 인증하는 방법이 일반적이에요.",
    timestamp: "2025-03-10T12:17:00Z"
  },
  {
    type: "question",
    messageId: "msg018",
    sender: "user18",
    content: "STOMP에서 메시지 브로커 역할을 하는 건 무엇인가요?",
    timestamp: "2025-03-10T12:18:00Z",
    likes: 5,
    likedByUser: true
  },
  {
    type: "chat",
    messageId: "msg019",
    sender: "user19",
    content: "RabbitMQ나 ActiveMQ 같은 메시지 브로커가 사용될 수 있어요.",
    timestamp: "2025-03-10T12:19:00Z"
  },
  {
    type: "chat",
    messageId: "msg020",
    sender: "user20",
    content: "Spring Boot에서는 기본적으로 내장된 SimpleBroker도 사용 가능해요.",
    timestamp: "2025-03-10T12:20:00Z"
  }
];

console.log(messages);


function InputWithSelect() {
  const [selected, setSelected] = useState(OPTIONS[0]);
  const [isOpen, setIsOpen] = useState(false);

  // 토글과 옵션 선택 핸들러를 useCallback으로 메모이제이션
  const toggleDropdown = useCallback(() => setIsOpen(prev => !prev), []);
  const handleSelect = useCallback((option) => {
    setSelected(option);
    setIsOpen(false);
  }, []);

  return (
    <div className="relative flex items-center w-full p-2 border rounded-lg bg-white">
      {/* Select 버튼 */}
      <div className="relative">
        <button
          onClick={toggleDropdown}
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
            {OPTIONS.map((option, idx) => (
              <li
                key={idx}
                className="px-4 py-2 text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => handleSelect(option)}
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
  const toggleChat = useCallback(() => setIsChatOpen(prev => !prev), []);

  return (
    <div
      className={`flex flex-col h-[768px] border border-gray-300 bg-white rounded-md shadow-md transition-all duration-300 ease-in-out ${mode ? "w-[50%]" : isChatOpen ? "w-[404px]" : "w-16 ml-auto"
        }`}
    >
      {/* 상단 바 (항상 보임) */}
      <div className={`flex items-center h-[54px] p-3 ${isChatOpen ? "border-b-2" : ""} border-[#e0e1e4] justify-between`}>
        {/* 접기/펼치기 버튼 */}
        {!mode && (
          <button
            onClick={toggleChat}
            className="w-10 h-10 flex items-center justify-center"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={`text-black transition-transform duration-300 ${isChatOpen ? 'scale-x-[-1]' : 'scale-x-100'}`}
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
        )}
        {/* 중앙 제목 */}
        {(mode || isChatOpen) && (
          <div className={`text-[#0d0d0d] text-xl items-center font-bold leading-[30px] ${mode ? "relative left-1/2" : ""}`}>
            채팅
          </div>
        )}
        {/* 추가 기능 버튼 */}
        {(mode || isChatOpen) && (
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
      {(mode || isChatOpen) && (
        <>
          {/* 중간 영역: 스크롤 가능한 콘텐츠 */}
          <div className="flex-1 px-[8px] pt-[16px] bg-gray-100 flex flex-col overflow-hidden">
            {/* 인기질문 영역 */}
            <div className='px-[12px] pt-[12px] pb-[8px] rounded-md bg-blue-0 border-2 border-blue-100'>
              <div className="mb-3 font-semibold text-[#131212]">인기질문</div>
              <div className="flex flex-col gap-2 max-h-[220px] overflow-y-auto scrollbar-hide">
                {messages
                  .filter((msg) => msg.type === 'question')
                  .map((q) => (
                    <div
                      key={q.id}
                      className="flex justify-between items-center bg-white/[0.9] p-2 rounded-md"
                    >
                      <div className="flex flex-col">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-700">{q.sender}</span>
                          <span className="text-xs text-gray-500">
                            {new Date(q.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <span className="text-xl font-medium text-blue-600">{q.content}</span>
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

            </div>

            {/* 채팅기록 영역 */}
            <div className="flex-1 mt-2 overflow-y-auto flex flex-col gap-2 scrollbar-hide">
              {messages.map((record, index) => (
                <div
                  key={`${record.messageId}-${index}`}
                  className="flex justify-between items-start"
                >
                  {/* 왼쪽 메시지 + 본문 */}
                  <div className="flex items-start gap-2">

                    <span className="text-[14px]  text-gray-500">
                      {new Date(record.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: false })}
                    </span>
                    <span className="text-[14px] font-semibold text-gray-800">{record.sender}</span>
                    <span className="text-[14px] font-medium text-gray-800">:</span>
                    {/* 다중 줄 지원 + question이면 파란색, chat이면 일반색 */}
                    <span
                      className={`text-[14px] whitespace-pre-wrap break-words ${record.type === "question" ? "text-blue-400" : "text-gray-800"
                        }`}
                    >
                      {record.content}
                    </span>
                  </div>

                  {/* type이 question일 때만 좋아요 아이콘과 rating 노출 */}
                  {record.type === "question" && (
                    <div className="flex items-center gap-1 ml-2">
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
                          fill={record.likedByUser ? "#ff5a5f" : "#9FA0A3"}
                          stroke={record.likedByUser ? "#ff5a5f" : "#9FA0A3"}
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}
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
