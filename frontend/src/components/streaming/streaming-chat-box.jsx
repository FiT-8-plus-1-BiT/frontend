import React, { useEffect, useState, useRef, useCallback } from "react";
import { connectWebSocket, sendMessage } from "~/api/stomp-client";
import { likeQuestion, unlikeQuestion } from "~/api/chat-like";

const StreamingChatBox = ({ mode, sessionId, userId }) => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [category, setCategory] = useState("general");
  const [message, setMessage] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => {
    const client = connectWebSocket(sessionId, (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    });
    setStompClient(client);
    return () => client.deactivate();
  }, [sessionId]);

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      sendMessage(stompClient, sessionId, userId, message, category);
      setMessage("");
    }
  };

  const handleLikeToggle = async (messageId, likedByUser) => {
    const success = likedByUser
      ? await unlikeQuestion(messageId)
      : await likeQuestion(messageId);
    if (success) {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.messageId === messageId
            ? {
                ...msg,
                likedByUser: !likedByUser,
                likes: likedByUser ? msg.likes - 1 : msg.likes + 1,
              }
            : msg
        )
      );
    }
  };

  const toggleChat = useCallback(() => setIsChatOpen((prev) => !prev), []);

  // mode가 true이면 w-[50%], 채팅창이 닫힌 상태이면 w-16 ml-auto
  const containerWidthClass = mode ? "w-[50%]" : !isChatOpen ? "w-16 ml-auto" : "";

  return (
    <div
      className={`flex flex-col border border-gray-300 bg-white rounded-md shadow-md transition-all duration-300 ease-in-out ${containerWidthClass}`}
      style={
        !mode && isChatOpen
          ? {
            width: "clamp(295px, 21.04vw, 404px)", // 가로 비율 유지 (404px → 295px)
            height: "clamp(596px, 42.6vw, 818px)", // 세로 비율 조정 (818px → 596px)
        }
        
          : {}
      }
    >
      {/* 상단 바 */}
      <div className={`flex items-center h-[54px] p-3 ${isChatOpen ? "border-b-2" : ""} border-[#e0e1e4] justify-between`}>
        {!mode && (
          <button onClick={toggleChat} className="w-10 h-10 flex items-center justify-center">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
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
        {(mode || isChatOpen) && <div className="text-[#0d0d0d] text-xl font-bold">채팅</div>}
      </div>

      {/* 메시지 영역 */}
      {isChatOpen && (
        <>
          <div className="flex-1 px-[8px] pt-[16px] bg-gray-100 flex flex-col overflow-hidden">
            <div className="flex-1 mt-2 overflow-y-auto flex flex-col gap-2">
              {messages.map((msg, index) => (
                <div key={index} className="flex justify-between items-start">
                  <div className="flex items-start gap-2">
                    <span className="text-[14px] text-gray-500">
                      {new Date(msg.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </span>
                    <span className="text-[14px] font-semibold text-gray-800">
                      {msg.sender}
                    </span>
                    :
                    <span
                      className={`text-[14px] ${msg.type === "question" ? "text-blue-400" : "text-gray-800"
                        }`}
                    >
                      {msg.content}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>

          {/* 입력창 & 전송 버튼 */}
          <div
            className="p-3 flex items-center w-full"

          >
            <select
              className="border rounded-md px-2 py-1 mr-2"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="general">채팅하기</option>
              <option value="question">질문하기</option>
            </select>
            <input
              type="text"
              placeholder="메시지를 입력하세요"
              className="flex-1 px-3 py-2 border rounded-md"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              onClick={handleSendMessage}
            >
              전송
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export { StreamingChatBox };
