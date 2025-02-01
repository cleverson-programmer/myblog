"use client";

import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getArticles, resetArticles } from '@/store/slices/articleSlice';
import Image from "next/image";

import { FaLinkedin, FaGithub, FaInstagramSquare } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";

import { getRandomColor, colors } from "@/utils/randomColors";

const ArticleCard = ({ article }) => {
  if (!article) return null;

  return (
    <div className="rounded-lg overflow-hidden cursor-pointer">
    <a key={article._id} href={`/articles/${article._id}`}>
      <div className="p-4">
        <div
          className="w-full h-48 flex justify-center items-center p-4 rounded-md"
          style={{ backgroundColor: getRandomColor() }}
        >
          <Image
            src={article.imageUrl}
            width={200}
            height={200}
            alt={article.title}
            className="object-contain"
          />
        </div>
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2 text-center">
            {article.title}
          </h2>
          <p className="text-center">
            {article.description.length > 256
              ? `${article.description.slice(0, 256)}...`
              : article.description}
          </p>
        </div>
      </div>
    </a>
    </div>
  );
};

export default function GridArticles () {

    const dispatch = useDispatch();
    const { articles, page, loading, error } = useSelector((state) => state.articles);
    
    useEffect(() => {
        if (articles.length === 0) { // Evitar múltiplas chamadas desnecessárias
          dispatch(resetArticles());
          dispatch(getArticles(1));
        }
    }, [dispatch, articles.length]);

    const canLoadMore = !loading && articles.length % 5 === 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Grid Principal */}
      <div className="grid gap-6">
        {/* Para telas grandes e médias */}
        <div className="hidden lg:grid grid-cols-2 gap-6">
          {/* Primeiros dois artigos lado a lado */}
          {articles.slice(0, 2).map((article, index) => (
            <ArticleCard key={`${article._id}-${index}`} article={article} />
          ))}
        </div>

        {/* Campo de texto e artigo para telas grandes */}
        <div className="hidden lg:grid grid-cols-2 gap-6">
        {articles.slice(2, 4).map((article, index) => (
            <ArticleCard key={`${article._id}-${index}`} article={article} />
          ))}
          
        </div>

        {/* Artigos restantes em grid para telas grandes */}
        <div className="hidden lg:grid grid-cols-4 gap-4">
          {articles.slice(4).map((article, index) => (
            <ArticleCard key={`${article._id}-${index}`} article={article} />
          ))}
        </div>

        {/* Estrutura para telas médias */}
        <div className="lg:hidden md:grid grid-cols-2 gap-6">
          {/* Primeiros dois artigos lado a lado */}
          {articles.slice(0, 2).map((article, index) => (
            <ArticleCard key={`${article._id}-${index}`} article={article} />
          ))}
        </div>
        <div className="lg:hidden md:block bg-gray-100 p-4 rounded shadow">
          <h2 className="text-lg font-bold mb-2">Informações</h2>
          <p>
            Este é um campo textual onde você pode adicionar informações
            adicionais ou um resumo sobre os artigos.
          </p>
        </div>
        <div className="lg:hidden md:block">
          <ArticleCard article={articles[2]} />
        </div>
        <div className="lg:hidden md:grid grid-cols-2 gap-6">
          {articles.slice(3).map((article, index) => (
            <ArticleCard key={`${article._id}-${index}`} article={article} />
          ))}
        </div>

        {/* Estrutura para telas pequenas */}
        <div className="md:hidden grid gap-6">
          {articles.map((article, index) => (
            <React.Fragment key={`${article._id}-${index}`}>
              {index === 2 && (
                <div className="bg-gray-100 p-4 rounded shadow">
                  <h2 className="text-lg font-bold mb-2">Informações</h2>
                  <p>
                    Este é um campo textual onde você pode adicionar
                    informações adicionais ou um resumo sobre os artigos.
                  </p>
                </div>
              )}
              <ArticleCard article={article} />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};
