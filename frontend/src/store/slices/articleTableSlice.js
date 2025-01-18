import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '@/api/articleApi';
import { deletedArticle } from './deleteArticleSlice';

export const fetchArticlesThunk = createAsyncThunk(
  'articles/fetchArticles',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchArticles(page);
      return response; // Response já terá os metadados
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articlesTableSlice = createSlice({
  name: 'articlesTable',
  initialState: {
    articles: [],
    currentPage: 1,
    isLoading: false,
    hasMore: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchArticlesThunk.fulfilled, (state, action) => {
        const newArticles = action.payload.filter(
          (article) => !state.articles.some((a) => a._id === article._id)
        );
        state.articles = [...state.articles, ...newArticles];
        state.isLoading = false;
        state.currentPage += 1;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchArticlesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletedArticle.fulfilled, (state, action) => {
        state.articles = state.articles.filter((article) => article._id !== action.payload);
      });
  },
});

export default articlesTableSlice.reducer;
