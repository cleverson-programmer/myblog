"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchPaginatedArticles, setCurrentPage } from "@/store/slices/paginationSlice";
import Loading from "@/utils/loading";
import Image from "next/image";
import { getRandomColor } from "@/utils/randomColors";

export function Pagination() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { articles, currentPage, loading, error, totalArticles } = useSelector(
    (state) => state.pagination
  );

  // Estado para controlar a subpágina atual (1, 2 ou 3)
  const [subPage, setSubPage] = useState(1);

  // Carrega os artigos quando o componente é montado ou a página muda
  useEffect(() => {
    dispatch(fetchPaginatedArticles(currentPage));
  }, [dispatch, currentPage]);

  // Função para mudar a página atual
  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page)); // Atualiza a página atual
    setSubPage(1); // Reseta a subpágina para 1 ao mudar de página
  };

  // Função para mudar a subpágina atual
  const handleSubPageChange = (newSubPage) => {
    setSubPage(newSubPage);
  };

  // Define o índice de início e fim dos artigos para a subpágina atual
  const startIndex = (subPage - 1) * 4; // 4 artigos por subpágina
  const paginatedArticles = articles.slice(startIndex, startIndex + 4);

  // Calcula o número total de páginas (com base no total de artigos e 12 artigos por página)
  const totalPages = Math.ceil(totalArticles / 12);

  return (
    <>
      {loading && <Loading />}
      {error && <p className="text-red-500">{error}</p>}

      {/* Grid de artigos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {paginatedArticles.map((article) => (
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
                <h2 className="text-lg font-semibold mt-4 text-center">{article.title}</h2>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Botões de subpágina (1, 2, 3) */}
      <div className="flex gap-2 justify-center mt-6">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => handleSubPageChange(page)}
            className={`py-2 px-4 rounded-full ${
              subPage === page
                ? "bg-gray-800 text-white"
                : "bg-white text-black border"
            }`}
          >
            {page}
          </button>
        ))}
        <a
          href="/articles"
          className="rounded-full border border-gray-400 py-2 px-4 uppercase bg-white text-gray-800 hover:bg-gray-400 hover:text-white"
        >
          Ver mais
        </a>
      </div>

    </>
  );
}