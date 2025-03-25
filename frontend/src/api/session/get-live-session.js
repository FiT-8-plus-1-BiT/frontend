const baseURL = 'https://fit-conf.shop';

// 좋아요 추가
export async function getLiveSessions(sessionId) {


  try {
    const response = await fetch(`${baseURL}/api/v1/session/all`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) throw new Error('서버 오류');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('좋아요 실패:', error);
    alert('좋아요 요청 실패');
  }
}

