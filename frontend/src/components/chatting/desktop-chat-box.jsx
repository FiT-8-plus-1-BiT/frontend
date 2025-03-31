// DesktopChatBox.jsx
import React from 'react';
import { QuestionList } from '~/components/chatting/streaming-chat-liked-question';
import ChatHeader from './chat-header';
import ChatInput from './chat-input';
import MessageItem from './message-item';

const DesktopChatBox = ({
  mode,
  isChatOpen,
  toggleDesktopChat,
  messages,
  chatEndRef,
  handleSendMessage,
  handleKeyPress,
  category,
  setCategory,
  message,
  setMessage,
  handleLikeToggle,
  sessionId, // 필요한 경우 전달
}) => {
  return (
    <div
      className={`hidden md:flex transition-all duration-300 md:h-[42.6vw] h-[79.8vw] ease-in-out ${
        mode ? 'w-[44vw] h-[42vw]' : isChatOpen ? 'w-[404px]' : 'w-[56px]'
      }`}
    >
      <div className="flex flex-col border border-gray-300 bg-gray-90 w-full">
        <ChatHeader
          mode={mode}
          isChatOpen={isChatOpen}
          toggleDesktopChat={toggleDesktopChat}
        />
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
            <ChatInput
              category={category}
              setCategory={setCategory}
              message={message}
              setMessage={setMessage}
              handleKeyPress={handleKeyPress}
              handleSendMessage={handleSendMessage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default DesktopChatBox;
