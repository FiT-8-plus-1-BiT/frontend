// src/api/chat/stomp-client.js
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

export function createStompClient(token, sessionId, onMessageReceived) {
  const stompClient = new Client({
    // 👉 SockJS 사용: webSocketFactory만 사용해야 함
    webSocketFactory: () => new SockJS("https://fit-conf.shop/ws-chat"),

    // 💡 brokerURL은 절대 같이 쓰면 안 됨! (SockJS 사용 시 제거)
    connectHeaders: {
      Authorization: [`Bearer ${token}`], // 문자열 템플릿 수정
    },

    debug: (str) => console.log(`📡 DEBUG: ${str}`), // 템플릿 리터럴 수정
    reconnectDelay: 5000,
    heartbeatIncoming: 4000,
    heartbeatOutgoing: 4000,

    onConnect: (frame) => {
      console.log("✅ STOMP 연결 성공:", frame);

      // 채팅 세션 구독
      stompClient.subscribe(`/sub/chat/${sessionId}`, (message) => { // 문자열로 수정
        try {
          const payload = JSON.parse(message.body);
          console.log("📥 메시지 수신:", payload);
          onMessageReceived?.(payload);
        } catch (e) {
          console.error("❌ 메시지 파싱 실패:", e);
        }
      });
    },

    onStompError: (frame) => {
      console.error("❌ STOMP 에러:", frame.headers['message']);
      console.error("🔻 내용:", frame.body);
    },

    onWebSocketClose: (event) => {
      console.warn("⚠️ WebSocket 연결 종료됨:", event);
    },

    onWebSocketError: (event) => {
      console.error("🚫 WebSocket 에러 발생:", event);
    },
  });

  console.log("🚀 STOMP 클라이언트 활성화 시도 중...(SockJS)");
  stompClient.activate();
  return stompClient;
}

export function sendMessage(stompClient, sessionId, userId, content) {
  if (!stompClient?.connected) {
    console.error("❌ STOMP 연결되지 않음");
    return;
  }

  const message = {
    sender: userId,
    content,
    timestamp: new Date().toISOString(),
  };

  stompClient.publish({
    destination: `/pub/chat/${sessionId}`, // 문자열로 수정
    body: JSON.stringify(message),
    headers: { "Content-Type": "application/json" },
  });

  console.log("📤 메시지 발송:", message);
}

export function disconnectStompClient(stompClient) {
  if (stompClient?.active) {
    stompClient.deactivate().then(() => {
      console.log("🛑 STOMP 연결 해제 완료");
    });
  }
}
