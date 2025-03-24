import React, { useEffect, useState, useRef, useCallback, memo } from "react";
import { connectWebSocket, sendMessage } from "~/api/chat/stomp-client";
import { likeQuestion, unlikeQuestion } from "~/api/chat/chat-like";
import { Send } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { QuestionList } from "~/components/streaming/streaming-chat-liked-question";

// ────────────────────────────────────────────────
// Memoized Message Item Component
// ────────────────────────────────────────────────
const MessageItem = memo(({ msg, onLikeToggle }) => {
  const handleLikeClick = () => onLikeToggle(msg.messageId, msg.likedByUser);

  const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="flex justify-between items-start group">
      <div className="flex items-start gap-2 flex-1">
        <span className="text-[14px] text-gray-500 min-w-[40px]">
          {formattedTime}
        </span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="text-[14px] font-semibold text-gray-800">
              {msg.sender}
            </span>
            {msg.type === "question" && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                질문
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[14px] ${msg.type === "question" ? "text-blue-600" : "text-gray-800"
                }`}
            >
              {msg.content}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={handleLikeClick}
        className={`ml-2 flex items-center gap-1 ${msg.likedByUser ? "text-red-500" : "text-gray-400"
          } hover:text-red-600 transition-colors`}
      >
        <svg
          className="w-4 h-4"
          fill={msg.likedByUser ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <span className="text-xs">{msg.likes}</span>
      </button>
    </div>
  );
});

// ────────────────────────────────────────────────
// StreamingChatBox Component
// ────────────────────────────────────────────────
const StreamingChatBox = ({ mode, sessionId, userId }) => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");

  const chatEndRef = useRef(null);
  const scrollContainerRef = useRef(null);

  // WebSocket 연결
  useEffect(() => {
    const client = connectWebSocket(
      sessionId,
      (newMessage) => setMessages((prev) => [...prev, newMessage]),
      (error) => console.error("WebSocket Error:", error)
    );
    setStompClient(client);
    return () => {
      if (client?.connected) client.deactivate();
    };
  }, [sessionId]);

  // 메시지 전송
  const handleSendMessage = () => {
    if (!stompClient?.connected) {
      console.error("WebSocket not connected");
      return;
    }
    if (message.trim()) {
      sendMessage(stompClient, sessionId, userId, message, category);
      setMessage("");
    }
  };

  // Enter 키 이벤트 처리
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  // 채팅 열기/닫기
  const toggleChat = useCallback(() => {
    setIsChatOpen((prev) => !prev)
    setIsMobileChatOpen((prev) => !prev)
  }, []);

  return (
    <>
      {/* 모바일 채팅 열기 버튼 */}
      <button
        onClick={() => setIsMobileChatOpen(true)}
        className="md:hidden fixed bottom-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
      <div
        className={`hidden md:flex transition-all duration-300 md:h-[42.6vw] h-[79.8vw] ease-in-out ${isChatOpen ? "w-[404px]" : "w-[56px]"
          }`}

      >
        <div className="flex flex-col border border-gray-300 bg-gray-90 w-full">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b">
            <div className="flex items-center gap-2">
              {/* 접기 버튼 */}
              <button
                onClick={toggleChat}
                className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
              >
                {isChatOpen ? (
                  <ChevronLeft className="w-4 h-4" />
                ) : (
                  <ChevronRight className="w-4 h-4" />
                )}
              </button>

              {/* 채팅 제목은 열려 있을 때만 보이게 */}
              {isChatOpen && <h2 className="text-lg font-bold">채팅</h2>}
            </div>


          </div>

          {/* 메시지 영역 */}
          {isChatOpen && (
            <>
              <QuestionList sessionId={sessionId} />
              <div className="flex-1 overflow-y-auto bg-gray-90 p-2">
                {messages.map((msg) => (
                  <MessageItem key={msg.messageId} msg={msg} onLikeToggle={() => { }} />
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* 입력창 */}
              <div className="p-2 m-2 gap-1 flex bg-gray-100">
                <select
                  className="text-sm px-2 py-1 rounded-md bg-white"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="GENERAL">일반채팅</option>
                  <option value="QUESTION">질문하기</option>
                </select>
                <input
                  type="text"
                  placeholder="메시지를 입력하세요"
                  className="w-full px-3 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  onClick={handleSendMessage}
                  className=" text-black rounded-md h-full aspect-square flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>



      {/* 768px 미만: Bottom Sheet */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 min-h-[50vh] bg-white border-t shadow-lg transition-transform duration-300 ease-in-out ${isMobileChatOpen ? "translate-y-0" : "translate-y-full"
          }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-lg font-bold">채팅</h2>
          <button onClick={toggleChat} className="text-gray-500 hover:text-gray-800">
            ✕
          </button>
        </div>

        {/* 질문 리스트 */}
        <QuestionList sessionId={sessionId} />

        {/* 메시지 목록 영역 (데스크탑과 동일 스타일 적용) */}
        <div className="flex-1 overflow-y-auto bg-gray-90 p-2 min-h-[50vh]">
          {messages.map((msg) => (
            <MessageItem key={msg.messageId} msg={msg} onLikeToggle={() => { }} />
          ))}
          <div ref={chatEndRef} />
        </div>

        {/* 입력창 (데스크탑과 동일한 클래스 구성) */}
        <div className="p-2 m-2 gap-1 flex items-center bg-gray-100">
          <select
            className="text-sm px-2 py-1 rounded-md bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="GENERAL">일반채팅</option>
            <option value="QUESTION">질문하기</option>
          </select>

          <input
            type="text"
            placeholder="메시지를 입력하세요"
            className="w-full px-3 py-2 bg-gray-100 rounded-md focus:ring-2 focus:ring-blue-500"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
          />

          <button
            onClick={handleSendMessage}
            className="text-black rounded-md h-full aspect-square flex items-center justify-center"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>

    </>
  );
};

export { StreamingChatBox };