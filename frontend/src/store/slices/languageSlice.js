import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "pt", // Idioma inicial
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage: (state) => {
      state.language = state.language === "pt" ? "en" : "pt";
    },
  },
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;
