// components/ThemeToggle.js
"use client"
import { useSelector, useDispatch } from 'react-redux';
import { toggleTheme } from '@/store/slices/themeSlice';

export default function ThemeToggle() {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-md"
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}
