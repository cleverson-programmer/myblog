// frontend/store/slices/deleteUsereSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { deleteUser } from '@/api/authApi';

// Thunk para buscar artigo por ID
export const deletedUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
        await deleteUser(id); // Chamada da API
        return id;
    } catch (error) {
        return rejectWithValue(error.message);
    }
  }
);

const deleteUserSlice = createSlice({
  name: 'deleteUser',
  initialState: {
    deletedUser: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(deletedUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletedUser.fulfilled, (state, action) => {
        state.deletedUser = action.payload;
        state.loading = false;
      })
      .addCase(deletedUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export default deleteUserSlice.reducer;