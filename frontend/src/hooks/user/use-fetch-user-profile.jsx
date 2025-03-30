import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserProfile } from '~/api/user/get-user-profile';
import { setUserProfile } from '~/redux/user-slice';

function useFetchUserProfile(token) {
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchProfile() {
      const profile = await getUserProfile(token);
      if (!profile) return;

      const { job, years, interests } = profile;

      // 조건: 모든 값이 입력되어 있어야만 저장
      if (job && years && interests.length > 0) {
        dispatch(setUserProfile({ job, years, interests }));
        console.log('✅ 프로필 Redux 저장 완료');
      } else {
        console.log('⚠️ 프로필 정보 미입력으로 Redux 저장 안됨');
      }
    }

    if (token) fetchProfile();
  }, [token, dispatch]);
}

export {useFetchUserProfile}