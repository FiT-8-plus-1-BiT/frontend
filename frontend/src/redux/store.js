// ~/redux/store.ts 또는 store.js

import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // localStorage 사용

import likedSessionsReducer from '~/redux/liked-sessions-slice';
import authReducer from '~/redux/auth-slice';

// 1. persist 설정
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // auth만 localStorage에 저장할 거면 이렇게!
};

// 2. 루트 리듀서 만들기
const rootReducer = combineReducers({
  auth: authReducer,
  likedSessions: likedSessionsReducer,
});

// 3. persist된 리듀서 만들기
const persistedReducer = persistReducer(persistConfig, rootReducer);

// 4. store 생성
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // redux-persist 때문에 필요함
    }),
});

// 5. persistor export
export const persistor = persistStore(store);
