const BASE_URL = 'https://fit-conference.shop';

// 세션 담기
export async function addToSchedule(sessionId, token) {
  const res = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sessionId }),
  });

  // 응답 로그 확인
  console.log('[ADD] 응답 상태 코드:', res.status);
  console.log('[ADD] 응답 상태 텍스트:', res.statusText);

  let responseData;
  try {
    responseData = await res.json();
    console.log('[ADD] 응답 데이터:', responseData);
  } catch (err) {
    console.error('[ADD] JSON 파싱 실패:', err);
  }

  if (!res.ok) {
    throw new Error(`세션 담기 실패: ${res.status} ${res.statusText}`);
  }

  console.log('✅ 세션 담기 완료');
  return responseData;
}

// 세션 담기 취소
export async function removeFromSchedule(sessionId, token) {
  const res = await fetch(`${BASE_URL}/api/v1/users/sessions`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ sessionId }),
  });

  // 응답 로그 확인
  console.log('[REMOVE] 응답 상태 코드:', res.status);
  console.log('[REMOVE] 응답 상태 텍스트:', res.statusText);

  let responseData;
  try {
    responseData = await res.json();
    console.log('[REMOVE] 응답 데이터:', responseData);
  } catch (err) {
    console.error('[REMOVE] JSON 파싱 실패:', err);
  }

  if (!res.ok) {
    throw new Error(`세션 담기 취소 실패: ${res.status} ${res.statusText}`);
  }

  console.log('✅ 세션 담기 취소 완료');
  return responseData;
}
