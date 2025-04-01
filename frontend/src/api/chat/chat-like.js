const API_BASE = 'https://fit-conference.shop/api/v1/chat';

export const likeQuestion = async (sessionId, messageId, token) => {
  const res = await fetch(`${API_BASE}/like/${sessionId}/${messageId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('좋아요 실패');
  }
};

export const unlikeQuestion = async (sessionId, messageId, token) => {
  const res = await fetch(`${API_BASE}/unlike/${sessionId}/${messageId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error('좋아요 취소 실패');
  }
};
