//~/api/session/session-to-schedule.js
export async function removeSessionFromSchedule(token, sessionId) {
    try {
      const response = await fetch(`https://fit-conf.shop/api/v1/users/sessions`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId }),
      });
  
      if (!response.ok) {
        throw new Error(`담기 취소 실패! 상태 코드: ${response.status}`);
      }
  
      console.log(`🗑️ 세션(${sessionId}) 미리 담기 취소 완료`);
      return true;
    } catch (error) {
      console.error('❌ 세션 담기 취소 실패:', error);
      return false;
    }
  }

  export async function addSessionToSchedule(token, sessionId) {
    try {
      const response = await fetch(`https://fit-conf.shop/api/v1/users/sessions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ sessionId }),
      });
  
      if (!response.ok) {
        throw new Error(`미리 담기 실패! 상태 코드: ${response.status}`);
      }
  
      console.log(`✅ 세션(${sessionId}) 미리 담기 완료`);
      return true;
    } catch (error) {
      console.error('❌ 세션 미리 담기 실패:', error);
      return false;
    }
  }
  