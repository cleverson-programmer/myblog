import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchArticles } from "@/api/articleApi";

export const fetchPaginatedArticles = createAsyncThunk(
  "pagination/fetchPaginatedArticles",
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchArticles(page); // Retorna { articles, totalArticles }
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const paginationSlice = createSlice({
  name: "pagination",
  initialState: {
    articles: [],
    currentPage: 1, 
    totalArticles: 0,
    loading: false,
    error: null, 
  },
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    resetPagination(state) {
      state.articles = [];
      state.currentPage = 1;
      state.totalArticles = 0;
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
        state.articles = action.payload.articles; // Armazena apenas os artigos
        state.totalArticles = action.payload.totalArticles; // Armazena o total de artigos
      })
      .addCase(fetchPaginatedArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentPage, resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;
