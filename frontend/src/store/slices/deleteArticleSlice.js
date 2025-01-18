// frontend/store/slices/deleteArticleSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteArticle } from '@/api/articleApi';

// Thunk para buscar artigo por ID
export const deletedArticle = createAsyncThunk(
  'article/deleteArticle',
  async (id, { rejectWithValue }) => {
    try {
        await deleteArticle(id); // Chamada da API
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

const deleteArticleSlice = createSlice({
  name: 'deleteArticle',
  initialState: {
    deletedArticle: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletedArticle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletedArticle.fulfilled, (state, action) => {
        state.deletedArticle = action.payload;
        state.loading = false;
      })
      .addCase(deletedArticle.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default deleteArticleSlice.reducer;