"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createArticle } from "@/store/slices/newArticleSlice";

import InputField from "@/components/articles/InputField";
import TextAreaField from "@/components/articles/TextAreaField";
import MarkdownInput from "@/components/articles/MarkdownEditor";
import MultiCategoryInput from "@/components/articles/MultiSelectField";
import DatePickerField from "@/components/articles/DatePickerField";
import { Header } from "@/components/home/nav/header";

import AdminRoute from "@/validations/adminRoute";

const CreateArticle = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    content: "",
    categories: [],
    tags: "",
    releaseDate: "",
    imageUrl: "",
    videoUrl: "",
    author: "",
  });

  const [notification, setNotification] = useState(null);

  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.newArticle);

  // Função para atualizar os campos do formulário
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  //Enviar para o backend os dados e resetar o formulário
  const handleSubmit = async () => {
    try {
      const result = await dispatch(createArticle(formData)).unwrap();

      setNotification(`Article successfully created! ID: ${result}`);

      setFormData({
        title: "",
        description: "",
        content: "",
        categories: [],
        tags: "",
        releaseDate: "",
        imageUrl: "",
        videoUrl: "",
        author: "",
      });
    } catch (error) {
      alert(`Erro ao criar o artigo: ${error}`);
    }
  };

  {loading && <p>Enviando artigo...</p>}
  {error && <p className="text-red-500">Erro: {error}</p>}


  return (
    <AdminRoute>
      <div className="container mx-auto p-6 pt-4">
        <Header />
        <h1 className="text-2xl text-center font-bold mt-6 mb-6">
          Create New Article
        </h1>
        {notification && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {notification}
          </div>
        )}
        <InputField
          label="Title"
          value={formData.title}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Enter the title"
        />
        <InputField
          label="Description"
          value={formData.description}
          onChange={(e) => handleChange("description", e.target.value)}
          placeholder="Enter a brief description"
        />
        <MarkdownInput
          label="Content"
          value={formData.content}
          onChange={(value) => handleChange("content", value)}
        />
        <MultiCategoryInput
          label="Categories"
          categories={formData.categories}
          onChange={(value) => handleChange("categories", value)}
        />
        <InputField
          label="Tags"
          value={formData.tags}
          onChange={(e) => handleChange("tags", e.target.value)}
          placeholder="Enter the tags"
        />
        <DatePickerField
          label="Release Date"
          value={formData.releaseDate}
          onChange={(e) => handleChange("releaseDate", e.target.value)}
        />
        <InputField
          label="Image URL"
          value={formData.imageUrl}
          onChange={(e) => handleChange("imageUrl", e.target.value)}
          placeholder="Enter the image URL"
        />
        <InputField
          label="Video ID"
          value={formData.videoUrl}
          onChange={(e) => handleChange("videoUrl", e.target.value)}
          placeholder="Enter the youtube video ID"
        />
        <InputField
          label="Author"
          value={formData.author}
          onChange={(e) => handleChange("author", e.target.value)}
          placeholder="Enter the author's name"
        />
        {loading && <p>Submitting...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          onClick={handleSubmit}
        >
          Publish Article
        </button>
      </div>
    </AdminRoute>
  );
};

export default CreateArticle;


