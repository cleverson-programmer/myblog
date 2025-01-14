// frontend/store/slices/paginationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '@/api/articleApi';

// Thunk para buscar artigos paginados
export const fetchPaginatedArticles = createAsyncThunk(
  'pagination/fetchPaginatedArticles',
  async (page, { rejectWithValue }) => {
    try {
      const articles = await fetchArticles(page);
      return { articles, page };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    articles: [],
    currentPage: 1,
    loading: false,
    error: null,
  },
  reducers: {
    resetPagination(state) {
      state.articles = [];
      state.currentPage = 1;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPaginatedArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPaginatedArticles.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.articles;
        state.currentPage = action.payload.page;
      })
      .addCase(fetchPaginatedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;
