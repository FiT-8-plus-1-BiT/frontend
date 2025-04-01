// src/api/congestion/stomp-client.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export function createCongestionStompClient(token, onMessageReceived) {
  const client = new Client({
    webSocketFactory: () => new SockJS('https://fit-conference.shop/ws'),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => console.log(`📡 DEBUG: ${str}`),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: () => {
      console.log('🟢 STOMP 연결됨. 혼잡도 구독 시작');

      client.subscribe('/sub/session', (message) => {
        try {
          const data = JSON.parse(message.body);
          console.log('📩 혼잡도 수신:', data);
          onMessageReceived(data);
        } catch (e) {
          console.error('❌ 메시지 파싱 실패:', e);
        }
      });
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

  client.activate();
  return client;
}
