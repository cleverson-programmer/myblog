// frontend/store/slices/articleIdSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticleById } from '@/api/articleApi';

// Thunk para buscar artigo por ID
export const getArticleById = createAsyncThunk(
  'article/getArticleById',
  async (id, { rejectWithValue }) => {
    try {
      return await fetchArticleById(id);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articleIdSlice = createSlice({
  name: 'articles',
  initialState: {
    article: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getArticleById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticleById.fulfilled, (state, action) => {
        state.article = action.payload;
        state.loading = false;
      })
      .addCase(getArticleById.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default articleIdSlice.reducer;
