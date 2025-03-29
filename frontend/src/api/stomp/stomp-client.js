// src/api/stomp/stomp-client.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

let stompClient = null;
let connected = false;
const subscriptions = {}; // { destination: callback }

export function initStompClient(token) {
  if (!token) {
    console.error('❌ STOMP 초기화 실패: 토큰 없음');
    return;
  }

  if (stompClient && stompClient.active) {
    console.log('✅ 이미 연결된 STOMP 클라이언트');
    return stompClient;
  }

  stompClient = new Client({
    webSocketFactory: () => new SockJS('https://fit-conf.shop/ws'),
    connectHeaders: {
      Authorization: `Bearer ${token}`,
    },
    debug: (str) => console.log(`📡 DEBUG: ${str}`),
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: () => {
      console.log('🟢 STOMP 연결됨');
      connected = true;

      // 등록된 구독 자동 연결
      Object.entries(subscriptions).forEach(([destination, callback]) => {
        stompClient.subscribe(destination, callback, {
          Authorization: `Bearer ${token}`,
        });
        console.log(`🔔 구독됨: ${destination}`);
      });
    },

    onStompError: (frame) => {
      console.error('❌ STOMP 에러:', frame.headers['message']);
      console.error('🔻 내용:', frame.body);
    },

    onWebSocketClose: (event) => {
      console.warn('⚠️ WebSocket 연결 종료됨:', event);
      connected = false;
    },

    onWebSocketError: (event) => {
      console.error('🚫 WebSocket 에러 발생:', event);
    },
  });

  stompClient.activate();
  return stompClient;
}

export function subscribeTo(destination, callback) {
  if (!stompClient) {
    console.warn(
      '⏳ STOMP 클라이언트 아직 없음. 자동 연결 시 구독됨:',
      destination,
    );
  }

  subscriptions[destination] = (message) => {
    try {
      const data = JSON.parse(message.body);
      callback(data);
    } catch (e) {
      console.error('❌ 메시지 파싱 실패:', e);
    }
  };

  if (connected) {
    stompClient.subscribe(destination, subscriptions[destination], {
      Authorization: `Bearer ${token}`,
    });
    console.log(`📩 즉시 구독 완료: ${destination}`);
  }
}

export function sendMessage(destination, body, headers = {}) {
  if (!stompClient || !connected) {
    console.error('❌ STOMP 연결되지 않음. 발송 실패');
    return;
  }

  stompClient.publish({
    destination,
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  });

  console.log('📤 메시지 발송:', body);
}

export function disconnectStomp() {
  if (stompClient?.active) {
    stompClient.deactivate().then(() => {
      console.log('🛑 STOMP 연결 해제됨');
      stompClient = null;
      connected = false;
    });
  }
}
