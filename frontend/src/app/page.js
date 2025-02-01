"use client"; // Adicionando diretiva para usar React no lado do cliente

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Image from "next/image";
import ProtectedRoute from '../validations/protectedRoute';
import { Header } from "@/components/home/nav/header";
import { Main } from "@/components/home/main/main";
import GridArticles from '@/components/home/container/gridArticles';
import apiRating from '@/api/rateLimiting';
import Notification from '@/utils/notification';
import Loading from '@/utils/loading'; // Importando o componente Loading
import About from '@/components/home/container/about';
import Contact from '@/components/home/container/contact';
import Footer from '@/components/footer/footer';

export default function Home() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar o loading
  const [notification, setNotification] = useState({
    message: "",
    type: "",
  });

  useEffect(() => {

    // Verifica se o usuário está autenticado
    const token = localStorage.getItem('authToken');
    const user = JSON.parse(localStorage.getItem('authUser'));
    if (token && user) {
      dispatch({ type: 'auth/loginUser/fulfilled', payload: { user, token } });
    }

    // Simula o carregamento da página
    const timer = setTimeout(() => {
      setIsLoading(false); // Desativa o loading após 2 segundos
    }, 100);

    // Limpa o timer ao desmontar o componente
    return () => clearTimeout(timer);
  }, [dispatch]);

  // Se isLoading for true, exibe o componente Loading
  if (isLoading) {
    return <Loading />;
  }

  // Quando isLoading for false, exibe o conteúdo da página
  return (
    <ProtectedRoute>
      <div className="min-h-screen px-4 pb-6 gap-16 font-[family-name:var(--font-geist-sans)]">
        <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start pt-4">
          <Header />
          <Main />
        </main>
        <GridArticles />
        <About id="about"/>
        <Contact id="contact"/>
        <Footer/>
      </div>
    </ProtectedRoute>
  );
}
