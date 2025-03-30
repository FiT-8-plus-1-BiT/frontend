// ~/api/user/get-user-profile.js
export async function getUserProfile(token) {
    try {
      const response = await fetch('https://fit-conf.shop/api/v1/users/profile', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
  
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('[❗] 유저 프로필 가져오기 실패:', error);
      return null;
    }
  }
  