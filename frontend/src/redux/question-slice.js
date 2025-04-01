import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { likeQuestion, unlikeQuestion } from '~/api/chat/chat-like';
import { fetchLikeStatus } from '~/api/chat/chat-like-check';

const initialState = {
  questions: [],
  likeStatusMap: {}, // 각 질문의 like 상태를 저장하는 맵
  loading: false,
  error: null,
};

// 좋아요 상태를 리덕스에서 가져오기
export const fetchLikes = createAsyncThunk(
  'questions/fetchLikes',
  async (sessionId, { getState }) => {
    const state = getState();
    const token = state.auth.token;
    const newStatus = {};
    for (const q of state.questions.questions) {
      const liked = await fetchLikeStatus(sessionId, q.messageId, token);
      newStatus[q.messageId] = liked;
    }
    return newStatus;
  }
);

// 좋아요/좋아요 취소 토글 액션
export const toggleLike = createAsyncThunk(
  'questions/toggleLike',
  async ({ sessionId, messageId, isLiked }, { getState }) => {
    const token = getState().auth.token;
    if (isLiked) {
      await unlikeQuestion(sessionId, messageId, token);
    } else {
      await likeQuestion(sessionId, messageId, token);
    }
    return { messageId, isLiked: !isLiked };
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLikes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchLikes.fulfilled, (state, action) => {
        state.loading = false;
        state.likeStatusMap = action.payload;
      })
      .addCase(fetchLikes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(toggleLike.fulfilled, (state, action) => {
        const { messageId, isLiked } = action.payload;
        state.likeStatusMap[messageId] = isLiked;
      });
  },
});

export const { setQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
