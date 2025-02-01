// frontend/store/slices/articleSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '@/api/articleApi';

// Thunk para buscar artigos com paginação
export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchArticles(page);
      return { articles: response.articles, page, totalArticles: response.totalArticles };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articleSlice = createSlice({
  name: 'article',
  initialState: {
    articles: [],
    page: 1,
    loading: false,
    error: null,
    totalArticles: 0, // Adiciona o estado para o número total de artigos
  },
  reducers: {
    resetArticles(state) {
      state.articles = [];
      state.page = 1;
      state.error = null;
      state.totalArticles = 0; // Reseta o total de artigos
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

        // Concatena os novos artigos sem duplicatas
        const newArticles = action.payload.articles.filter(
          (newArticle) => !state.articles.some((article) => article._id === newArticle._id)
        );

        state.articles = [...state.articles, ...newArticles];
        state.page = action.payload.page;
        state.totalArticles = action.payload.totalArticles; // Atualiza o total de artigos
      })
      .addCase(getArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { resetArticles } = articleSlice.actions;
export default articleSlice.reducer;
