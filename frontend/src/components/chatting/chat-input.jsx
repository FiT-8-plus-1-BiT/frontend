// ChatInput.jsx
import React from 'react';
import { Send } from 'lucide-react';

const ChatInput = ({
  category,
  setCategory,
  message,
  setMessage,
  handleKeyPress,
  handleSendMessage,
}) => {
  return (
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
  );
};

export default ChatInput;
