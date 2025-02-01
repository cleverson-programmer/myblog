'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { getArticleById } from '@/store/slices/articleIdSlice';
import Loading from '@/utils/loading'; // Importando o componente Loading
import Image from 'next/image';
import { Header } from '@/components/home/nav/header';
import ProtectedRoute from '@/validations/protectedRoute';
import { Pagination } from '@/components/articles/Pagination';
import { getRandomColor, colors } from '@/utils/randomColors';
import Notification from '@/utils/notification';

export default function ArticlePage({ params }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { article, loading, error, page } = useSelector((state) => state.article);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const resolveParams = async () => {
      const { id } = await params;
      if (id) {
        setIsLoading(true);
        dispatch(getArticleById(id))
          .then(() => setIsLoading(false)) // Desativa o loading após a busca ser concluída
          .catch(() => setIsLoading(false)); // Desativa o loading em caso de erro
      }
    };

    resolveParams();
  }, [dispatch, params]);

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false)
      const timer = setTimeout(() => {
        router.push("/login");
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [router]);

  if (!isAuthenticated) {
    return (
      <Notification
        message={'Autentique-se primeiro para acessar a página. Redirecionando...'}
        type='warning'
      />
    );
  }

  
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return (
      <p className="text-red-500">{error}</p>
    )
  }

  return (
    <ProtectedRoute>
      <div className="p-6">
        <Header />
        {article ? (
          <div className="mt-6">
            {/* Título e detalhes do artigo */}
            <h1 className="text-3xl font-bold text-center">{article.title}</h1>
            <div className="flex justify-center flex-wrap gap-3 mt-4">
              {article.categories.map((category, index) => (
                <p
                  key={index}
                  className="py-2 px-4 rounded-lg text-sm font-semibold"
                  style={{ backgroundColor: getRandomColor() }}
                >
                  {category}
                </p>
              ))}
            </div>
            <p className="mt-6 text-xl text-center">{article.description}</p>
            <div className="flex flex-col md:flex-col md:justify-start mt-2">
              <h2 className="text-lg">
                <span className="font-semibold">Escrito por:</span>{" "}
                {article.author}
              </h2>
              <span className="text-sm">
                {new Date(article.releaseDate)
                  .toISOString()
                  .slice(0, 10)
                  .replace(/-/g, "/")}
              </span>
            </div>

            {/* Imagem e vídeo */}
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center mt-6 gap-6">
              {/* Imagem */}
              <Image
                src={article.imageUrl}
                alt={article.title}
                width={200}
                height={200}
                className="w-full lg:w-1/2 h-80 object-contain flex justify-center rounded-md mx-auto"
              />

              {/* Vídeo */}
              {article.videoUrl && (
                <iframe
                  src={`https://www.youtube.com/embed/${article.videoUrl}`}
                  title={article.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full lg:w-1/2 h-80 rounded-md"
                />
              )}
            </div>

            {/* Conteúdo */}
            <div className="mt-10 w-full flex text-justify items-center justify-center">
              <div
                className="w-[80%] text-xl leading-loose"
                dangerouslySetInnerHTML={{ __html: article.content }}
              />
            </div>

            <div className="mt-6">
              <p className="text-lg">
                <span className="font-semibold pr-2">Tags:</span>
                {article.tags}
              </p>
            </div>

            <div className="bg-gray-400 rounded-md font-bold text-lg w-fit mt-10 px-4 py-2">
              <p>Artigos relacionados</p>
            </div>
          </div>
        ) : (
          <p>Artigo não encontrado.</p>
        )}
        <Pagination />
      </div>
    </ProtectedRoute>
  );
}
