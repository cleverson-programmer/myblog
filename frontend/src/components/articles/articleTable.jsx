"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticlesThunk } from "@/store/slices/articleTableSlice";
import { deletedArticle } from "@/store/slices/deleteArticleSlice";
import { useRouter } from "next/navigation";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Notification from "@/utils/notification";
import Loading from "@/utils/loading";

const ArticleTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [type, setType] = useState("success");
  const [notification, setNotification] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Obtém o estado do Redux
  const { articles, currentPage, isLoading, hasMore, totalArticles } = useSelector(
    (state) => state.articlesTable
  );
  const { loading: deleteLoading, error: deleteError } = useSelector((state) => state.deleteArticle);

  // Carrega os artigos quando o componente é montado ou a página muda
  useEffect(() => {
    if (!hasMore || isLoading) return;
    dispatch(fetchArticlesThunk(currentPage));
  }, [dispatch, currentPage]);

  // Função para deletar um artigo
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      setIsDeleting(true);
      try {
        await dispatch(deletedArticle(id)).unwrap();
        setNotification(`Article successfully deleted! ID: ${id}`);
        setType("success");
      } catch (error) {
        setNotification('Failed to delete article');
        setType("error");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  // Funções para edição de artigos
  const handleEditFull = (article) => {
    router.push(`/articles/put/${article._id}`);
  };

  const handleEditPartial = (article) => {
    router.push(`/articles/patch/${article._id}`);
  };

  // Exibe o componente Loading enquanto os artigos estão sendo carregados ou um artigo está sendo deletado
  if (isLoading || isDeleting) {
    return <Loading />;
  }

  return (
    <div className="overflow-x-auto mt-6">
      <Notification
        message={notification}
        type={type}
        onClose={() => setNotification("")}
      />
      <div className="flex justify-end gap-4 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
          <span>Deleted</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
          <span>Edit</span>
        </div>
      </div>
      <div className="max-h-[calc(10*3rem)] overflow-y-auto border border-gray-200 rounded-md">
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-200 px-4 py-2">#</th>
              <th className="border border-gray-200 px-4 py-2">Title</th>
              <th className="border border-gray-200 px-4 py-2">ID</th>
              <th className="border border-gray-200 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article, index) => (
              <tr key={article._id} className="hover:bg-gray-50">
                <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-200 px-4 py-2">{article.title}</td>
                <td className="border border-gray-200 px-4 py-2">{article._id}</td>
                <td className="flex justify-center border border-gray-200 px-4 py-2">
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleDelete(article._id)}
                    disabled={isDeleting}
                  >
                    <MdDelete fontSize={20} />
                  </button>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    onClick={() => handleEditFull(article)}
                  >
                    <FaEdit fontSize={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {hasMore && (
        <button
          className="mt-4 bg-gray-800 text-white px-4 py-2 rounded"
          onClick={() => dispatch(fetchArticlesThunk(currentPage + 1))}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "View More"}
        </button>
      )}
    </div>
  );
};

export default ArticleTable;