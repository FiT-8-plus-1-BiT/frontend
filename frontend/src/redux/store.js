import { configureStore } from '@reduxjs/toolkit';
import likedSessionsReducer from '~/redux/likedSessionsSlice';
import authReducer from '~/redux/auth-slice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    likedSessions: likedSessionsReducer,
  },
});

export default store;
