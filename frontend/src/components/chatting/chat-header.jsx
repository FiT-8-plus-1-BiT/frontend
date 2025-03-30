// ChatHeader.jsx
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const ChatHeader = ({ mode, isChatOpen, toggleDesktopChat }) => {
  return (
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
  );
};

export default ChatHeader;
