import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { putEditArticle } from '@/api/articleApi';

// Thunk para atualizar o artigo
export const putEditArticleThunk = createAsyncThunk(
  'articles/putEdit',
  async ({ id, articleData }, { rejectWithValue }) => {
    try {
      const response = await putEditArticle(id, articleData);
      return response; // Retorna os dados da API
    } catch (error) {
      return rejectWithValue(error.message); // Retorna o erro
    }
  }
);

const putArticleSlice = createSlice({
  name: 'putArticle',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPutState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(putEditArticleThunk.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(putEditArticleThunk.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(putEditArticleThunk.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload;
      });
  },
});

export const { resetPutState } = putArticleSlice.actions;

export default putArticleSlice.reducer;
