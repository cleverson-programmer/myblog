
import { createSlice } from '@reduxjs/toolkit';

// Defina o estado inicial como 'light' por padrão
const initialState = {
  theme: 'light',
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme: (state, action) => {
      state.theme = action.payload;
      // Aqui você só acessa o localStorage no cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', action.payload);
        document.documentElement.classList.remove(state.theme === 'light' ? 'dark' : 'light');
        document.documentElement.classList.add(action.payload);
      }
    },
    toggleTheme: (state) => {
      const newTheme = state.theme === 'light' ? 'dark' : 'light';
      state.theme = newTheme;
      // Acesso ao localStorage também só no cliente
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.remove(state.theme === 'light' ? 'dark' : 'light');
        document.documentElement.classList.add(newTheme);
      }
    },
  },
});

export const { setTheme, toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;

