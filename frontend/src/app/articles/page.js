"use client";

import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { getArticles, resetArticles } from '@/store/slices/articleSlice';
import ProtectedRoute from '@/validations/protectedRoute';
import Loading from '@/utils/loading';
import Image from 'next/image';
import { Header } from '@/components/home/nav/header';
import { ButtonMain } from '@/components/home/main/button';
import { getRandomColor } from '@/utils/randomColors';
import Link from 'next/link';

export default function Articles() {
  const dispatch = useDispatch();
  const { articles, page, loading, error, totalArticles } = useSelector((state) => state.articles);
  const [isLoading, setIsLoading] = useState(true);
  const scrollPositionRef = useRef(0);

  useEffect(() => {
    dispatch(resetArticles());
    setIsLoading(true);
    dispatch(getArticles(1))
      .then(() => setIsLoading(false))
      .catch(() => setIsLoading(false));
  }, [dispatch]);

  const handleLoadMore = async (e) => {
    e.preventDefault();

    // Salva a posição de rolagem atual
    const scrollPosition = window.scrollY;

    setIsLoading(true);
    try {
      await dispatch(getArticles(page + 1));
    } catch (error) {
      console.error("Erro ao carregar mais artigos:", error);
    } finally {
      setIsLoading(false);

      
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth',
      });
    }
  };

  // Determina se deve exibir o botão "View More"
  const canLoadMore = articles.length < totalArticles;

  if (isLoading) {
    return <Loading />;
  }

  return (
    <ProtectedRoute>
      <div>
        <div className='p-8 pt-4'>
          <Header />
        </div>

        {/* Grid de artigos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {articles.map((article) => (
            <Link key={article._id} href={`/articles/${article._id}`}>
              <div className="rounded-lg overflow-hidden cursor-pointer">
                <div className="p-4">
                  <div
                    className="w-full h-48 flex justify-center items-center p-4 rounded-md"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    <Image
                      src={article.imageUrl}
                      width={150}
                      height={150}
                      alt={article.title}
                      className="object-contain"
                    />
                  </div>
                  <div className="mt-4">
                    <h2 className="text-lg font-semibold mb-2 text-center">{article.title}</h2>
                    <p className="text-center">
                      {article.description.length > 256
                        ? `${article.description.slice(0, 256)}...`
                        : article.description}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Condicional para o botão e a mensagem de erro */}
        {error ? (
          <div className='flex justify-center mb-4 mt-4'>
            <p className="text-red-500 text-lg mt-4 ml-4">
              {error}
            </p>
          </div>
        ) : (
          canLoadMore && (
            <div className="flex flex-col items-center justify-center mt-6 mb-6 font-bold">
              <ButtonMain onClick={(e) => handleLoadMore(e)} disabled={loading}>
                {loading ? "Loading..." : "View More"}
              </ButtonMain>
            </div>
          )
        )}
      </div>
    </ProtectedRoute>
  );
}

