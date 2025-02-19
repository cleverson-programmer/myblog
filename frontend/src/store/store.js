import { configureStore } from '@reduxjs/toolkit';
import themeReducer from './slices/themeSlice';
import languageReducer from "./slices/languageSlice";
import authReducer from './slices/authSlice';
import articleReducer from './slices/articleSlice';
import paginationReducer from './slices/paginationSlice';
import articlesReducer from './slices/articleIdSlice'
import newArticleReducer from './slices/newArticleSlice'
import articlesTableReducer from './slices/articleTableSlice'
import putArticleReducer from './slices/putArticleSlice';
import deleteArticleReducer from './slices/deleteArticleSlice'
import searchArticlesReducer from './slices/searchArticles'
import userTableReducer from './slices/userTableSlice'
import deleteUserReducer from './slices/deleteUserSlice'
import categoriesTagsReducer from './slices/categoriesTagsSlice'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    language: languageReducer,
    auth: authReducer,
    article: articlesReducer,
    articles: articleReducer,
    pagination: paginationReducer,
    newArticle: newArticleReducer,
    articlesTable: articlesTableReducer,
    putArticle: putArticleReducer,
    deleteArticle: deleteArticleReducer,
    search: searchArticlesReducer,
    usersTable: userTableReducer,
    deleteUser: deleteUserReducer,
    categoriesTags: categoriesTagsReducer,
  },
});

export default store;
