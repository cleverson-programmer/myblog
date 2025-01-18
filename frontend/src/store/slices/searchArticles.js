import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { searchArticlesApi } from '@/api/articleApi';

export const fetchSearchResults = createAsyncThunk(
  'search/fetchSearchResults',
  async (query, thunkAPI) => {
    try {
      return await searchArticlesApi(query);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    query: '',
    results: [],
    status: 'idle', // idle, loading, succeeded, failed
    error: null,
  },
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    clearResults(state) {
      state.results = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchResults.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchSearchResults.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.results = action.payload;
      })
      .addCase(fetchSearchResults.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { setQuery, clearResults } = searchSlice.actions;

export default searchSlice.reducer;
