const baseURL = 'https://fit-conference.shop';

// 좋아요 추가
export async function postLike(sessionId,token) {
  if (!token) {
    alert('로그인 후 이용 가능합니다.');
    return;
  }

  try {
    const response = await fetch(`${baseURL}/api/v1/users/sessions/like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
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

// 좋아요 취소 (DELETE)
export async function deleteLike(sessionId,token) {
  if (!token) {
    alert('로그인 후 이용 가능합니다.');
    return;
  }

  try {
    const response = await fetch(`${baseURL}/api/v1/users/sessions/like`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ sessionId }),
    });

    if (!response.ok) throw new Error('서버 오류');

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('좋아요 취소 실패:', error);
    alert('좋아요 취소 요청 실패');
  }
}
