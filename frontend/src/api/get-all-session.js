// src/api/session/getAll.js

const BASE_URL = 'https://fit-conf.shop';

/**
 * 세션 전체 리스트를 조회하는 함수 (fetch 사용)
 * @param {Object} params
 * @param {Object} params.pageable - 페이지 정보
 * @param {number} params.pageable.page - 페이지 번호
 * @param {number} params.pageable.size - 페이지 크기
 * @param {string[]} [params.pageable.sort] - 정렬 기준
 * @param {Object} params.dto - 필터 정보
 * @param {string} [params.dto.field]
 * @param {string} [params.dto.topic]
 * @param {string} [params.dto.type]
 * @param {string} [params.dto.level]
 * @returns {Promise<Object>} 응답 데이터
 */
export const getAllSessions = async ({ pageable, dto }) => {
  try {
    const queryParams = new URLSearchParams();

    const allParams = { ...pageable, ...dto };
    for (const key in allParams) {
      const value = allParams[key];
      if (Array.isArray(value)) {
        value.forEach((v) => queryParams.append(key, v));
      } else if (value !== undefined && value !== '') {
        queryParams.append(key, value);
      }
    }

    const response = await fetch(
      `${BASE_URL}/api/v1/session/all?${queryParams.toString()}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      },
    );

    if (!response.ok) {
      throw new Error(`HTTP 오류! 상태: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('세션 전체 조회 실패:', error);
    throw error;
  }
};
