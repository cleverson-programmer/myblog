// components/ThemeProvider.js
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTheme } from '@/store/themeSlice';

export function ThemeProvider({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    // No cliente, acessa o localStorage e define o tema inicial
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      dispatch(setTheme(savedTheme));
      document.documentElement.classList.add(savedTheme);
    }
  }, [dispatch]);

  return <>{children}</>;
}
