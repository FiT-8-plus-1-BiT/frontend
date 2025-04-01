// src/api/session/getLive.js

const BASE_URL = 'https://fit-conference.shop';

export const getLiveSessions = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/session/live`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error(`서버 오류 발생! 상태 코드: ${response.status}`);
    }

    const data = await response.json();
    console.log('✅ 라이브 세션 조회 결과:', data);

    return data.response || []; // 응답 구조 내 response 배열만 반환
  } catch (error) {
    console.error('❌ 라이브 세션 불러오기 실패:', error);
    return []; // 실패 시에도 빈 배열 반환
  }
};
