// src/api/chat/stomp-client.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export function createStompClient(token, sessionId, onMessageReceived) {
  if (!token || token.trim() === '') {
    console.error('❌ STOMP 연결 시도 실패: 유효하지 않은 토큰');
    return null;
  }
  const stompClient = new Client({
    // SockJS를 사용하므로 webSocketFactory만 사용합니다.
    webSocketFactory: () => new SockJS('https://fit-conf.shop/ws'),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => console.log(`📡 DEBUG: ${str}`),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: (frame) => {
      console.log('✅ STOMP 연결 성공:', frame);
      // 채팅 세션 구독
      stompClient.subscribe(
        `/sub/chat/${sessionId}`,
        (message) => {
          try {
            const payload = JSON.parse(message.body);
            console.log('📥 메시지 수신:', payload);
            onMessageReceived?.(payload);
          } catch (e) {
            console.error('❌ 메시지 파싱 실패:', e);
          }
        },
        {
          Authorization: `Bearer ${token}`,
        },
      );
    },

    onStompError: (frame) => {
      console.error('❌ STOMP 에러:', frame.headers['message']);
      console.error('🔻 내용:', frame.body);
    },

    onWebSocketClose: (event) => {
      console.warn('⚠️ WebSocket 연결 종료됨:', event);
    },

    onWebSocketError: (event) => {
      console.error('🚫 WebSocket 에러 발생:', event);
    },
  });

  console.log('🚀 STOMP 클라이언트 활성화 시도 중...(SockJS)');
  stompClient.activate();
  return stompClient;
}

export function sendMessage(
  stompClient,
  token,
  sessionId,
  userId,
  message,
  category,
) {
  if (!stompClient?.connected) {
    console.error('❌ STOMP 연결되지 않음');
    return;
  }

  const messages = {
    sessionId: sessionId,
    userId: Number(userId),
    message: message, // ✅ content → message로 변경
    category: category,
  };

  stompClient.publish({
    destination: `/pub/chat-pub/${sessionId}`,
    body: JSON.stringify(messages),
    headers: {
      'Content-Type': 'application/json',
      'User-Id': userId,
      Authorization: `Bearer ${token}`,
    },
  });

  console.log('📤 메시지 발송:', messages);
}

export function disconnectStompClient(stompClient) {
  if (stompClient?.active) {
    stompClient.deactivate().then(() => {
      console.log('🛑 STOMP 연결 해제 완료');
    });
  }
}
