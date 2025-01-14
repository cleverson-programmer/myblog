"use client"
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchPaginatedArticles } from '@/store/slices/paginationSlice'
import Loading from '@/utils/loading';
import Image from 'next/image';
import Link from 'next/link';

import { getRandomColor, colors } from '@/utils/randomColors';

export function Pagination(){

    const dispatch = useDispatch();
    const router = useRouter();
    const { articles, currentPage, loading, error } = useSelector((state) => state.pagination);
  
    useEffect(() => {
      dispatch(fetchPaginatedArticles(currentPage));
    }, [dispatch, currentPage]);
  
    const handlePageChange = (page) => {
      dispatch(fetchPaginatedArticles(page));
    };

    return (
      <>
        {loading && <Loading/>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {articles.slice(0, 4).map((article) => (
            <Link key={article._id} href={`/articles/${article._id}`}>
                <div
                className="rounded-lg overflow-hidden cursor-pointer">
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
                    <h2 className="text-lg font-semibold mt-4 text-center">
                      {article.title}
                    </h2>
                  </div>
                </div>
            </Link>
          ))}
        </div>

        <div className="flex gap-2 justify-center mt-6">
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`py-2 px-4 rounded-full ${
                currentPage === page
                  ? "bg-gray-800 text-white"
                  : "bg-white text-black border"
              }`}
            >
              {page}
            </button>
          ))}
          <a
            href={`/articles`}
            className="rounded-full border border-gray-400 py-2 px-4 uppercase bg-white text-gray-800 hover:bg-gray-400 hover:text-white"
          >
            Ver mais
          </a>
        </div>
      </>
    );
}