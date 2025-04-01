// src/api/session/get-session-information.js

export async function getSessionInformation(sessionId, token) {
    try {
        const response = await fetch(`https://fit-conference.shop/api/v1/session/${sessionId}?sessionId=${sessionId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                // 인증 필요 시 여기에 Authorization 헤더 추가
                "Authorization": `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error(`❌ HTTP 에러! 상태 코드: ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
            throw new Error(`❌ API 오류: ${data.message}`);
        }
        console.log('세션 상세정보', data.response)
        return data.response;
    } catch (error) {
        console.error("🚨 세션 정보 가져오기 실패:", error);
        throw error; // 필요 시 호출부에서 try-catch로 처리
    }
}
