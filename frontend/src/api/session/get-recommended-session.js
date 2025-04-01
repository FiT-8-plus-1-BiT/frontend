// src/api/session/get-recommended-session.js

const BASE_URL = 'https://fit-conference.shop';

export const getRecommendedSessions = async (token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/session/recommended`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (!response.ok) {
      throw new Error(`서버 오류 발생! 상태 코드: ${response.status}`);
    }

    const data = await response.json();
    console.log('추천 세션 조회 결과:', data);
    return data.response.content;
  } catch (error) {
    console.error('세션 조회 실패:', error);
  }
};
