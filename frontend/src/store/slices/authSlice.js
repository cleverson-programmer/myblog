import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginApi, registerApi, registerAdminApi, logoutApi} from '../../api/authApi';

//Lógica de login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const data = await loginApi(email, password);
      localStorage.setItem('authToken', data.token); // Salvar token no localStorage
      return data; // Retorna usuário e token
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message || 'Error authenticating, please check your details.');
    }
  }
);

//Lógica de registro guest
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async ({ email, password }, thunkAPI) => {
      try {
        const status = await registerApi(email, password);
      if (status === 201) {
        return { message: 'User registered successfully!' }; // Retorna a mensagem de sucesso
      }
      return thunkAPI.rejectWithValue('Registration failed.');
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error registering, please try again.');
      }
    }
);

//Lógica de registro admin
export const registerAdminUser = createAsyncThunk(
  'auth/registerAdminUser',
  async ({ email, password }, thunkAPI) => {
    try {
      const status = await registerAdminApi(email, password);
    if (status === 201) {
      return { message: 'User registered successfully!' }; // Retorna a mensagem de sucesso
    }
    return thunkAPI.rejectWithValue('Registration failed.');
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || 'Error registering, please try again.');
    }
  }
);

//Lógica de logout
export const logoutUser = createAsyncThunk(
    'auth/logoutUser',
    async (_, thunkAPI) => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) throw new Error('Token não encontrado.');
  
        await logoutApi(token);
  
        // Remove o token do localStorage
        localStorage.removeItem('authToken');
        localStorage.removeItem('tokenExpiration')
        return true; // Indica que o logout foi bem-sucedido
      } catch (error) {
        return thunkAPI.rejectWithValue(error.message || 'Erro ao realizar logout.');
      }
    }
);
  

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    successMessage: null,
  },
  reducers: {
    resetSuccessMessage: (state) => {
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //register
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //register admin
      .addCase(registerAdminUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerAdminUser.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
      })
      .addCase(registerAdminUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Logout
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export const { resetSuccessMessage } = authSlice.actions;

export default authSlice.reducer;
