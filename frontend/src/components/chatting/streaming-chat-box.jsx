import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  createStompClient,
  sendMessage,
  disconnectStompClient,
} from '~/api/chat/stomp-client';
import { fetchRecentMessages } from '~/api/chat/chat-message';
import { fetchLikes, toggleLike } from '~/redux/question-slice'; // 리덕스 액션
import DesktopChatBox from './desktop-chat-box';

const StreamingChatBox = ({ mode, token, sessionId, userId }) => {
  const dispatch = useDispatch();
  const { likeStatusMap, messages: storedMessages, loading } = useSelector((state) => state.questions); // likeStatusMap과 기존 메시지 가져오기
  const [isChatOpen, setIsChatOpen] = useState(mode);
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState(storedMessages);
  const [category, setCategory] = useState('GENERAL');
  const [message, setMessage] = useState('');
  const chatEndRef = useRef(null);

  useEffect(() => {
    if (mode) setIsChatOpen(true);
  }, [mode]);

  useEffect(() => {
    if (!token || !sessionId) return;

    // ✅ 리덕스를 통해 좋아요 상태 초기화
    dispatch(fetchLikes(sessionId));  // 세션 ID로 좋아요 상태 불러오기

    // ✅ 초기 메시지 불러오기
    const loadInitialMessages = async () => {
      const initialMessages = await fetchRecentMessages(sessionId, token);

      // `likeStatusMap`을 사용하여 각 메시지에 대해 `isLiked` 상태를 결정
      const likeCheckedMessages = initialMessages.map((s) => {
        const isLiked = likeStatusMap[s.messageId] ?? false; // 기본값 false
        return { ...s, isLiked }; // 메시지에 isLiked 추가
      });

      // `likeCheckedMessages`를 리덕스 상태에 저장
      dispatch(setMessages(likeCheckedMessages));
      setMessages(likeCheckedMessages); // 로컬 상태에도 업데이트
    };

    loadInitialMessages();

    const client = createStompClient(token, sessionId, (newMessage) => {
      setMessages((prev) => {
        const exists = prev.some((m) => m.messageId === newMessage.messageId);
        return exists ? prev : [...prev, newMessage];
      });
    });
    setStompClient(client);

    return () => {
      disconnectStompClient(client);
    };
  }, [token, sessionId, dispatch, likeStatusMap]); // likeStatusMap을 의존성으로 추가

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

  const handleLikeToggle = (messageId, likedByUser) => {
    // `toggleLike` 액션만 호출하고, 로컬 상태는 리덕스 상태에 맞춰 업데이트
    dispatch(toggleLike({ sessionId, messageId, isLiked: likedByUser }))
      .then(() => {
        // 리덕스 상태 업데이트 후, 메시지에 대한 좋아요 상태를 로컬 상태에 맞게 반영
        setMessages((prev) =>
          prev.map((msg) =>
            msg.messageId === messageId
              ? {
                  ...msg,
                  likedByUser: likedByUser,
                  likes: likedByUser ? msg.likes +100 : msg.likes + 1,
                }
              : msg
          )
        );
      })
      .catch((err) => console.error('좋아요 토글 실패:', err));
  };
  

  return (
    <>
      <DesktopChatBox
        mode={mode}
        isChatOpen={isChatOpen}
        toggleDesktopChat={toggleDesktopChat}
        messages={messages} // 좋아요 상태가 반영된 메시지 전달
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
