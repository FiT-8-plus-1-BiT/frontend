import { useEffect } from 'react';

const useCreateChatSession = (sessionId, token) => {
  useEffect(() => {
    const createChatSession = async () => {
      if (!sessionId || !token) return;

      try {
        const response = await fetch(`https://fit-conf.shop/api/v1/chat/session/${sessionId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.text();
        console.log('채팅방 생성 성공:', data);
      } catch (error) {
        console.error('채팅방 생성 실패:', error);
      }
    };

    createChatSession();
  }, [sessionId, token]);
};

export {useCreateChatSession};
