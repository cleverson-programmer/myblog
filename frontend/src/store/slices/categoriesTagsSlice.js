import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchCategoriesTags } from '@/api/articleApi'; // Função que vamos criar

// Thunk para buscar categorias e tags
export const fetchCategoriesTagsThunk = createAsyncThunk(
  'categoriesTags/fetchCategoriesTags',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetchCategoriesTags();
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const categoriesTagsSlice = createSlice({
  name: 'categoriesTags',
  initialState: {
    categories: {}, // Exemplo: { "React": 10, "Javascript": 12 }
    tags: {}, // Exemplo: { "frontend": 5, "backend": 8 }
    isLoading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoriesTagsThunk.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesTagsThunk.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
        state.tags = action.payload.tags;
        state.isLoading = false;
      })
      .addCase(fetchCategoriesTagsThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default categoriesTagsSlice.reducer;