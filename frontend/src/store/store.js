import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import languageReducer from "./slices/languageSlice";
import authReducer from './slices/authSlice';
import articleReducer from './slices/articleSlice';
import paginationReducer from './slices/paginationSlice';
import articlesReducer from './slices/articleIdSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    auth: authReducer,
    article: articlesReducer,
    articles: articleReducer,
    pagination: paginationReducer,
  },
});

export default store;
