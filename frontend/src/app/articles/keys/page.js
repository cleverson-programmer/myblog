"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchSearchResults, setQuery, clearResults } from "@/store/slices/searchArticles";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { getRandomColor } from '@/utils/randomColors';
import { Header } from "@/components/home/nav/header";
import ProtectedRoute from "@/validations/protectedRoute";
import Loading from "@/utils/loading";

export default function Keys() {
  const dispatch = useDispatch();
  const { query, results, status, error } = useSelector(
    (state) => state.search
  );
  const searchParams = useSearchParams();

  // Captura a query da URL
  const categoryQuery = searchParams.get("category");

  // Atualiza o estado da query no Redux quando a query da URL muda
  useEffect(() => {
    if (categoryQuery) {
      dispatch(setQuery(categoryQuery));
    }
  }, [categoryQuery, dispatch]);

  // Realiza a pesquisa quando a query no Redux é atualizada
  useEffect(() => {
    if (query) {
      dispatch(fetchSearchResults(query));
    }
  }, [query, dispatch]);

  // Limpa os resultados quando o componente é desmontado
  useEffect(() => {
    return () => {
      dispatch(clearResults());
    };
  }, [dispatch])

  return (
    <ProtectedRoute>
      <div>
        <Header />
        <h1 className="w-full mt-6 flex justify-center text-xl">Artigos relacionados: {categoryQuery}</h1>
        {status === "loading" && <Loading/>}
        {status === "failed" && <p>Erro: {error}</p>}
        {status === "succeeded" && results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
            {results.map((article) => (
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
                </div>
              </a>
            ))}
          </div>
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </div>
    </ProtectedRoute>
  );
}
