import React, { useEffect, useState, useRef, useCallback, memo } from 'react';
import {
  createStompClient,
  sendMessage,
  disconnectStompClient,
} from '~/api/chat/stomp-client';
import { likeQuestion, unlikeQuestion } from '~/api/chat/chat-like';
import { Send, MessageSquare, ChevronLeft, ChevronRight } from 'lucide-react';
import { QuestionList } from '~/components/streaming/streaming-chat-liked-question';

// ────────────────────────────────────────────────
// Memoized Message Item Component
// ────────────────────────────────────────────────
const MessageItem = memo(({ msg, onLikeToggle }) => {
  const handleLikeClick = () => onLikeToggle(msg.messageId, msg.likedByUser);

  const formattedTime = new Date(msg.timestamp).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
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
              {msg.name}
            </span>
            {msg.type === 'question' && (
              <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                질문
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span
              className={`text-[14px] ${msg.type === 'question' ? 'text-blue-600' : 'text-gray-800'}`}
            >
              {msg.message}
            </span>
          </div>
        </div>
      </div>
      <button
        onClick={handleLikeClick}
        className={`ml-2 flex items-center gap-1 ${msg.likedByUser ? 'text-red-500' : 'text-gray-400'} hover:text-red-600 transition-colors`}
      >
        <svg
          className="w-4 h-4"
          fill={msg.likedByUser ? 'currentColor' : 'none'}
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
const StreamingChatBox = ({ mode, token, sessionId, userId }) => {
  const [isChatOpen, setIsChatOpen] = useState(mode); // 초기값 mode
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [category, setCategory] = useState('GENERAL');
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (mode) setIsChatOpen(true);
  }, [mode]);

  useEffect(() => {
    if (!token || !sessionId) return;

    const client = createStompClient(token, sessionId, (newMessage) =>
      setMessages((prev) => [...prev, newMessage]),
    );
    setStompClient(client);
    return () => {
      disconnectStompClient(client);
    };
  }, [token, sessionId]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!stompClient?.connected || !message.trim()) return;
    sendMessage(stompClient, token, sessionId, userId, message, category);
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleDesktopChat = useCallback(() => {
    if (!mode) setIsChatOpen((prev) => !prev);
  }, [mode]);

  const toggleMobileChat = useCallback(() => {
    setIsMobileChatOpen((prev) => !prev);
  }, []);

  const handleLikeToggle = (messageId, likedByUser) => {
    const action = likedByUser ? unlikeQuestion : likeQuestion;
    action(messageId).catch((err) =>
      console.error(`${likedByUser ? 'Unlike' : 'Like'} failed:`, err),
    );
  };

  return (
    <>
      {/* 모바일 채팅 열기 버튼 */}
      {!mode && (
        <button
          onClick={() => setIsMobileChatOpen(true)}
          className="md:hidden fixed bottom-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center"
        >
          <MessageSquare className="w-5 h-5" />
        </button>
      )}

      {/* 데스크탑 채팅창 */}
      <div
        className={`hidden md:flex transition-all duration-300 md:h-[42.6vw] h-[79.8vw] ease-in-out ${mode
          ? 'w-[44vw] h-[42vw]'
          : isChatOpen
            ? 'w-[404px]'
            : 'w-[56px]'
          }`}
      >

        <div className="flex flex-col border border-gray-300 bg-gray-90 w-full">
          {/* 상단 바 */}
          <div className="flex items-center justify-between p-3 border-b">
            {mode ? (
              <div className="w-full text-center">
                <h2 className="text-lg font-bold">채팅</h2>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleDesktopChat}
                  className="w-8 h-8 flex items-center justify-center rounded hover:bg-gray-100"
                >
                  {isChatOpen ? (
                    <ChevronRight className="w-4 h-4" />
                  ) : (
                    <ChevronLeft className="w-4 h-4" />
                  )}
                </button>
                {isChatOpen && <h2 className="text-lg font-bold">채팅</h2>}
              </div>
            )}
          </div>

          {isChatOpen && (
            <>
              <QuestionList sessionId={sessionId} />
              <div className="flex-1 overflow-y-auto bg-gray-90 p-2">
                {messages.map((msg) => (
                  <MessageItem
                    key={msg.messageId}
                    msg={msg}
                    onLikeToggle={handleLikeToggle}
                  />
                ))}
                <div ref={chatEndRef} />
              </div>
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
                  className="text-black rounded-md h-full aspect-square flex items-center justify-center"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* 모바일 채팅창 */}
      <div
        className={`md:hidden fixed bottom-0 left-0 right-0 min-h-[50vh] bg-white border-t shadow-lg transition-transform duration-300 ease-in-out ${isMobileChatOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
      >
        <div className="flex items-center justify-between p-3 border-b">
          <h2 className="text-lg font-bold">채팅</h2>
          <button
            onClick={toggleMobileChat}
            className="text-gray-500 hover:text-gray-800"
          >
            ✕
          </button>
        </div>
        <QuestionList sessionId={sessionId} />
        <div className="flex-1 overflow-y-auto bg-gray-90 p-2 min-h-[50vh]">
          {messages.map((msg) => (
            <MessageItem
              key={msg.messageId}
              msg={msg.message}
              onLikeToggle={handleLikeToggle}
            />
          ))}
          <div ref={chatEndRef} />
        </div>
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
