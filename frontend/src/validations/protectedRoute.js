"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const expiration = localStorage.getItem('tokenExpiration');

    if (!token || !expiration || Date.now() > expiration) {
        localStorage.removeItem('authToken'); // Remove token expirado
        localStorage.removeItem('tokenExpiration');
        router.push('/login');
    }else{
        setIsAuthenticated(true)
    }

  }, [router]);

  if (!isAuthenticated) return null; // Evita renderizar conteúdo antes da verificação

  return children;
}