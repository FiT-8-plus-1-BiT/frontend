// ~/api/chat/chat-like-check.js

export const fetchLikeStatus = async (sessionId, messageId, token) => {
    const url = `https://fit-conference.shop/api/v1/chat/likes/${sessionId}/${messageId}`;
  
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
      console.log('✅ 좋아요 여부 응답:', data);
      return data; // true 또는 false
    } catch (error) {
      console.error('❌ 좋아요 여부 조회 실패:', error);
      return false; // 기본값: 좋아요 안 누른 상태
    }
  };
  