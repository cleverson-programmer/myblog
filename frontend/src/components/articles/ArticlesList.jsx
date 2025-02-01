'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { fetchArticlesByCategory, fetchArticlesByTag } from '@/api/articleApi';

const ArticlesList = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = searchParams.get('slug'); // Obtém o parâmetro `slug` da URL
  const pathname = router.pathname;

  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let fetchedArticles = [];
        if (pathname.includes('categories') && slug) {
          fetchedArticles = await fetchArticlesByCategory(slug);
        } else if (pathname.includes('tag') && slug) {
          fetchedArticles = await fetchArticlesByTag(slug);
        }

        setArticles(fetchedArticles);
      } catch (err) {
        setError(err.message || 'Erro ao buscar artigos');
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchArticles();
    }
  }, [slug, pathname]);

  if (isLoading) return <p>Carregando artigos...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        {pathname.includes('categories') ? `Artigos da categoria: ${slug}` : `Artigos da tag: ${slug}`}
      </h1>
      {articles.length === 0 ? (
        <p>Nenhum artigo encontrado.</p>
      ) : (
        <ul className="space-y-4">
          {articles.map((article) => (
            <li key={article._id} className="p-4 border rounded-lg shadow">
              <h2 className="text-xl font-semibold">{article.title}</h2>
              <p className="text-gray-600">{article.summary || 'Sem resumo disponível'}</p>
              <button
                className="text-blue-500 hover:underline mt-2"
                onClick={() => router.push(`/articles/${article._id}`)}
              >
                Ler mais
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ArticlesList;

