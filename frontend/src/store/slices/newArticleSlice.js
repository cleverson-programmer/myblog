import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { postNewArticle } from '@/api/articleApi'; // Importar a lógica de API

// Async thunk para fazer a requisição POST
export const createArticle = createAsyncThunk(
  'articles/createArticle',
  async (articleData, { rejectWithValue }) => {
    try {
      const response = await postNewArticle(articleData);
      return response
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Slice
const newArticleSlice = createSlice({
  name: 'newArticle',
  initialState: {
    articles: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createArticle.fulfilled, (state, action) => {
        state.loading = false;
        state.articles.push(action.payload);
      })
      .addCase(createArticle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default newArticleSlice.reducer;

