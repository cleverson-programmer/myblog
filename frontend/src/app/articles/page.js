'use client';

import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getArticles, resetArticles } from '@/store/slices/articleSlice';
import ProtectedRoute from '@/validations/protectedRoute';
import Loading from '@/utils/loading';
import Image from 'next/image';
import { Header } from '@/components/home/nav/header';
import { ButtonMain } from '@/components/home/main/button';

import { getRandomColor, colors } from '@/utils/randomColors';

export default function Articles() {
  const dispatch = useDispatch();
  const { articles, page, loading, error } = useSelector((state) => state.articles);

  useEffect(() => {
    // Limpa os artigos ao montar o componente
    dispatch(resetArticles());
    
    dispatch(getArticles(1)); // Carrega a primeira página ao montar o componente
  }, [dispatch]);

  const handleLoadMore = () => {
    dispatch(getArticles(page + 1)); // Carrega a próxima página
  };

  // Determina se deve exibir o botão e a mensagem de erro
  const canLoadMore = !loading && articles.length % 5 === 0; // Assume paginação de 5 artigos por página

  return (
    <ProtectedRoute>
      <div>
        {loading ? <Loading /> : null}

        <div className='p-8 pt-4'>
            <Header/>
        </div>

        {/* Grid de artigos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {articles.map((article) => (
            <a key={article._id} href={`/articles/${article._id}`}>
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
          </a>
          ))}
        </div>

        {/* Condicional para o botão e a mensagem de erro */}
        {canLoadMore && (
          <div className="flex justify-center mt-6 mb-6 font-bold">
            <ButtonMain onClick={handleLoadMore}></ButtonMain>
            {error && <p className="text-red-500 text-2xl mt-4 ml-4">{error}</p>}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}

