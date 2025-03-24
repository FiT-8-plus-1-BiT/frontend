import { createSlice } from '@reduxjs/toolkit';

// 초기 상태 정의
const initialState = {
  user: null,
  token: null,
  isAuthenticated: false,
  loading: false,
  error: null,
};

// authSlice 생성
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // 로그인 성공
    loginSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      // 인증 상태 업데이트
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    // 로그인 실패
    loginFailure(state, action) {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    // 회원가입 성공
    signupSuccess(state, action) {
      state.user = action.payload.user;
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.loading = false;
      state.error = null;
    },
    // 회원가입 실패
    signupFailure(state, action) {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
    // 로딩 상태 설정
    setLoading(state) {
      state.loading = true;
    },
    // 오류 상태 설정
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    // 로그아웃
    logout(state) {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});

// 액션 내보내기
export const {
  loginSuccess,
  loginFailure,
  signupSuccess,
  signupFailure,
  setLoading,
  setError,
  logout,
} = authSlice.actions;

// 리듀서 내보내기
export default authSlice.reducer;
