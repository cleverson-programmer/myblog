import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchArticles } from '@/api/articleApi';
import { deletedArticle } from './deleteArticleSlice';

export const fetchArticlesThunk = createAsyncThunk(
  'articles/fetchArticles',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchArticles(page);
      return response; // Response agora inclui { articles, totalArticles }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const articlesTableSlice = createSlice({
  name: 'articlesTable',
  initialState: {
    articles: [], // Lista de artigos carregados
    currentPage: 1, // Página atual
    isLoading: false, // Estado de carregamento
    hasMore: true, // Indica se há mais artigos para carregar
    totalArticles: 0, // Número total de artigos no banco de dados
    error: null, // Mensagem de erro
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticlesThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticlesThunk.fulfilled, (state, action) => {
        const { articles, totalArticles } = action.payload;

        // Filtra artigos duplicados
        const newArticles = articles.filter(
          (article) => !state.articles.some((a) => a._id === article._id)
        );

        // Atualiza o estado
        state.articles = [...state.articles, ...newArticles];
        state.isLoading = false;
        state.currentPage += 1;
        state.totalArticles = totalArticles; // Atualiza o número total de artigos
        state.hasMore = state.articles.length < totalArticles; // Verifica se há mais artigos para carregar
      })
      .addCase(fetchArticlesThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletedArticle.fulfilled, (state, action) => {
        // Remove o artigo deletado da lista
        state.articles = state.articles.filter((article) => article._id !== action.payload);
        state.totalArticles -= 1; // Atualiza o número total de artigos
      });
  },
});

export default articlesTableSlice.reducer;
