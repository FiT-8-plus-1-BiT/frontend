
const BASE_URL = 'https://fit-conf.shop';

/**
 * 현재 라이브 중인 세션을 가져오는 API 함수
 * @returns {Promise<Array>} 라이브 세션 리스트
 */
export async function getLiveSessions() {
  try {
    const response = await fetch(`${BASE_URL}/api/v1/session/live`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`서버 오류 발생! 상태 코드: ${response.status}`);
    }

    const data = await response.json();
    console.log('라이브 세션',data)
    return data.response || []; // `response` 배열만 반환
  } catch (error) {
    console.error('라이브 세션 불러오기 실패:', error);
    return [];
  }
}
