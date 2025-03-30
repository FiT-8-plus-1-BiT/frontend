// StreamingChatBox.jsx
import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  createStompClient,
  sendMessage,
  disconnectStompClient,
} from '~/api/chat/stomp-client';
import { likeQuestion, unlikeQuestion } from '~/api/chat/chat-like';
import DesktopChatBox from './desktop-chat-box';
import MobileChatBox from './mobile-chat-box';

const StreamingChatBox = ({ mode, token, sessionId, userId }) => {
  const [isChatOpen, setIsChatOpen] = useState(mode);
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
    action(sessionId, messageId, token)
      .then(() => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.messageId === messageId
              ? {
                  ...msg,
                  likedByUser: !likedByUser,
                  likes: likedByUser ? msg.likes - 1 : msg.likes + 1,
                }
              : msg,
          ),
        );
      })
      .catch((err) => console.error('좋아요 토글 실패:', err));
  };

  return (
    <>
      {/* 모바일 채팅 열기 버튼 */}
      {!mode && (
        <button
          onClick={() => setIsMobileChatOpen(true)}
          className="md:hidden fixed bottom-4 right-4 p-3 rounded-full bg-blue-600 text-white shadow-lg flex items-center justify-center"
        >
          {/* 여기에 MessageSquare 아이콘 등 사용 */}
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {/* 적절한 path 삽입 */}
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 8h10M7 12h4m1 8h2a2 2 0 002-2V7a2 2 0 00-2-2h-2"
            />
          </svg>
        </button>
      )}

      <DesktopChatBox
        mode={mode}
        isChatOpen={isChatOpen}
        toggleDesktopChat={toggleDesktopChat}
        messages={messages}
        chatEndRef={chatEndRef}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        category={category}
        setCategory={setCategory}
        message={message}
        setMessage={setMessage}
        handleLikeToggle={handleLikeToggle}
        sessionId={sessionId}
      />

      <MobileChatBox
        isMobileChatOpen={isMobileChatOpen}
        toggleMobileChat={toggleMobileChat}
        messages={messages}
        chatEndRef={chatEndRef}
        handleSendMessage={handleSendMessage}
        handleKeyPress={handleKeyPress}
        category={category}
        setCategory={setCategory}
        message={message}
        setMessage={setMessage}
        handleLikeToggle={handleLikeToggle}
        sessionId={sessionId}
      />
    </>
  );
};

export { StreamingChatBox };
