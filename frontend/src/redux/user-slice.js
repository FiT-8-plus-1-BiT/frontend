// store/user-slice.js
import { createSlice } from '@reduxjs/toolkit'; // ✅ 요 줄 추가만 하면 됩니다!

const initialState = {
    job: '',
    years: '',
    interests: [],
  };
  
  const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserProfile: (state, action) => {
        const { job, years, interests } = action.payload;
        state.job = job;
        state.years = years;
        state.interests = interests;
      },
    },
  });
  
  export const selectIsProfileComplete = (state) => {
    const { job, years, interests } = state.user;
    return !!job && !!years && interests.length > 0;
  };
  
  export const { setUserProfile } = userSlice.actions;
  export default userSlice.reducer;
  