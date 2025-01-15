"use client";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchArticlesThunk } from "@/store/slices/articleTableSlice";
import { useRouter } from "next/navigation"; // Import do roteador correto no App Router

import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const ArticleTable = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { articles, currentPage, isLoading, hasMore } = useSelector((state) => state.articlesTable);

  useEffect(() => {
    dispatch(fetchArticlesThunk(currentPage));
  }, [dispatch, currentPage]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this article?")) {
      // Call delete logic here
    }
  };

  const handleEditFull = (article) => {
    router.push(`/articles/put/${article._id}`);
  };

  const handleEditPartial = (article) => {
    router.push(`/articles/patch/${article._id}`);
  };

  return (
    <div className="overflow-x-auto mt-6">
        <div className="flex justify-end gap-4 mb-4">
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-red-500 rounded-full"></span>
                <span>Deleted</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
                <span>Edit full</span>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-4 h-4 bg-green-500 rounded-full"></span>
                <span>Edit Partial</span>
            </div>
            
        </div>
      <table className="table-auto w-full border-collapse border border-gray-200">
        <thead>
          <tr className="">
            <th className="border border-gray-200 px-4 py-2">#</th>
            <th className="border border-gray-200 px-4 py-2">Title</th>
            <th className="border border-gray-200 px-4 py-2">ID</th>
            <th className="border border-gray-200 px-4 py-2">Actions </th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article, index) => (
            <tr key={article._id} className="hover:bg-gray-50">
              <td className="border border-gray-200 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-200 px-4 py-2">{article.title}</td>
              <td className="border border-gray-200 px-4 py-2">{article._id}</td>
              <td className="border border-gray-200 px-4 py-2">
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleDelete(article._id)}
                >
                  <MdDelete fontSize={20}/>
                </button>
                <button
                  className="bg-blue-500  text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleEditFull(article)}
                >
                  <FaEdit fontSize={20}/>
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded"
                  onClick={() => handleEditPartial(article)}
                >
                   <FaEdit fontSize={20}/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
