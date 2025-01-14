// frontend/store/slices/articleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles, fetchArticleById } from '@/api/articleApi';

// Thunk para buscar artigos com paginação
export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (page, { rejectWithValue }) => {
    try {
      const articles = await fetchArticles(page);
      return { articles, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    article: null,
    page: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetArticles(state) {
      state.articles = [];
      state.page = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = [...state.articles, ...action.payload.articles];
        state.page = action.payload.page;
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetArticles } = articleSlice.actions;
export default articleSlice.reducer;
