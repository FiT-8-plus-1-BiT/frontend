// ~/api/chat/chat-message.js

export const fetchRecentMessages = async (sessionId, token) => {
    const url = `https://fit-conf.shop/api/v1/chat/${sessionId}/messages`;
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('✅ fetchRecentMessages response:', data);
      return data.response || data; // 서버 응답 구조에 따라 조정
    } catch (error) {
      console.error('❌ fetchRecentMessages 실패:', error);
      return []; // 실패 시 빈 배열 반환
    }
  };
  