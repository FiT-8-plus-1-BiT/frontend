const API_BASE_URL = "http://localhost:8080/api/v1/chat";

/**
 * 질문 메시지 좋아요 추가
 * @param {string} messageId - 좋아요를 추가할 메시지 ID
 */
export const likeQuestion = async (messageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/like/${messageId}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("좋아요 추가 실패");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/**
 * 질문 메시지 좋아요 취소
 * @param {string} messageId - 좋아요를 취소할 메시지 ID
 */
export const unlikeQuestion = async (messageId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/unlike/${messageId}`, {
      method: "POST",
    });
    if (!response.ok) throw new Error("좋아요 취소 실패");
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
};
