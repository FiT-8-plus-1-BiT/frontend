// src/api/session/getAll.js

const BASE_URL = 'https://fit-conference.shop/';

export const getAllSessions = async (token) => {
  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/session/all?page=0&size=100&sort=id,asc`,
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
    console.log('세션 전체 조회 결과:', data);
    return data.response.content;
  } catch (error) {
    console.error('세션 조회 실패:', error);
  }
};
