import { Client } from "@stomp/stompjs";

/**
 * STOMP WebSocket 클라이언트 생성 및 설정
 * @param {string} sessionId - 채팅 세션 ID
 * @param {function} onMessageReceived - 메시지 수신 시 호출할 콜백 함수
 * @returns {Client} - STOMP 클라이언트 객체
 */
export function connectWebSocket(sessionId, onMessageReceived) {
  const stompClient = new Client({
    brokerURL: "ws://localhost:8080/ws", // WebSocket 연결 URL
    reconnectDelay: 5000, // 자동 재연결 간격 (5초)
    onConnect: () => {
      console.log(`✅ STOMP 연결 성공 [sessionId: ${sessionId}]`);

      // 메시지 구독 (클라이언트가 메시지를 수신할 경로)
      stompClient.subscribe(`/sub/chat/${sessionId}`, (message) => {
        if (onMessageReceived) {
          onMessageReceived(JSON.parse(message.body));
        }
      });
    },
    onStompError: (frame) => {
      console.error("❌ STOMP 오류 발생:", frame.headers["message"]);
    },
    onWebSocketClose: () => {
      console.warn("⚠️ WebSocket 연결 종료됨. 재연결 시도 중...");
    },
  });

  stompClient.activate(); // WebSocket 연결 활성화
  return stompClient;
}

/**
 * STOMP 메시지 발행 함수 (pub 사용)
 * @param {Client} stompClient - STOMP 클라이언트
 * @param {string} sessionId - 채팅 세션 ID
 * @param {string} userId - 메시지 전송자의 사용자 ID
 * @param {string} content - 보낼 메시지 내용
 */
export function sendMessage(stompClient, sessionId, userId, content) {
  if (stompClient && stompClient.connected) {
    const message = {
      sender: userId,
      content: content,
      timestamp: new Date().toISOString(),
    };

    stompClient.publish({
      destination: `/pub/chat/${sessionId}`, // 서버로 메시지 전송하는 pub 경로
      body: JSON.stringify(message),
    });

    console.log(`📤 메시지 발송: ${content}`);
  } else {
    console.error("❌ STOMP 클라이언트가 연결되지 않음.");
  }
}
