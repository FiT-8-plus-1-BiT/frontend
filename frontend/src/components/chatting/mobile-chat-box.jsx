// MobileChatBox.jsx
import React from 'react';
import { QuestionList } from '~/components/chatting/streaming-chat-liked-question';
import ChatInput from './chat-input';
import MessageItem from './message-item';

const MobileChatBox = ({
  isMobileChatOpen,
  toggleMobileChat,
  messages,
  chatEndRef,
  handleSendMessage,
  handleKeyPress,
  category,
  setCategory,
  message,
  setMessage,
  handleLikeToggle,
  sessionId,
}) => {
  return (
    <div
      className={`md:hidden fixed bottom-0 left-0 right-0 min-h-[50vh] bg-white border-t shadow-lg transition-transform duration-300 ease-in-out ${
        isMobileChatOpen ? 'translate-y-0' : 'translate-y-full'
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
            msg={msg}
            onLikeToggle={handleLikeToggle}
          />
        ))}
        <div ref={chatEndRef} />
      </div>
      <ChatInput
        category={category}
        setCategory={setCategory}
        message={message}
        setMessage={setMessage}
        handleKeyPress={handleKeyPress}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
};

export default MobileChatBox;
