// store/likedSessionsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// 비동기 API 호출
export const fetchLikedSessions = createAsyncThunk(
  'likedSessions/fetch',
  async () => {
    const res = await fetch('https://fit-conference.shop/api/v1/users/sessions/like');
    const data = await res.json();
    return data.response.map((session) => session.id); // ID만 추출해서 저장
  },
);

const likedSessionsSlice = createSlice({
  name: 'likedSessions',
  initialState: {
    ids: [],
    loading: false,
    error: null,
  },
  reducers: {
    likeSession: (state, action) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    unlikeSession: (state, action) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikedSessions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLikedSessions.fulfilled, (state, action) => {
        state.ids = action.payload;
        state.loading = false;
      })
      .addCase(fetchLikedSessions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { likeSession, unlikeSession } = likedSessionsSlice.actions;
export default likedSessionsSlice.reducer;
