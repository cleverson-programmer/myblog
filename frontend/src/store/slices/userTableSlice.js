import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchUsers } from '@/api/authApi';
import { deletedUser } from './deleteUserSlice';

export const fetchUsersThunk = createAsyncThunk(
  'user/fetchUsers',
  async (page, { rejectWithValue }) => {
    try {
      const response = await fetchUsers(page);
      return response; // Response já terá os metadados
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const usersTableSlice = createSlice({
  name: 'usersTable',
  initialState: {
    users: [],
    currentPage: 1,
    isLoading: false,
    hasMore: true,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsersThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsersThunk.fulfilled, (state, action) => {
        const newUsers = action.payload.filter(
          (user) => !state.users.some((a) => a._id === user._id)
        );
        state.users = [...state.users, ...newUsers];
        state.isLoading = false;
        state.currentPage += 1;
        state.hasMore = action.payload.length > 0;
      })
      .addCase(fetchUsersThunk.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deletedUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user._id !== action.payload);
      });
  },
});

export default usersTableSlice.reducer;
