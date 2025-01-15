"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getArticleById } from "@/store/slices/articleIdSlice";

import DatePickerField from "@/components/articles/DatePickerField";
import InputField from "@/components/articles/InputField";
import MarkdownInput from "@/components/articles/MarkdownEditor";
import MultiCategoryInput from "@/components/articles/MultiSelectField";
import { Header } from "@/components/home/nav/header";

export default function PagePut() {

    const router = useRouter();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { article, loading } = useSelector((state) => state.article); // Selecione os dados do Redux
  
    const [formData, setFormData] = useState({
      _id: "",
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
  
    useEffect(() => {
      if (id) {
        dispatch(getArticleById(id)); // Busca o artigo pelo ID
      }
    }, [id, dispatch]);
  
    useEffect(() => {
      if (article) {
        setFormData(article); // Atualiza o formulário com os dados do artigo
      }
    }, [article]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("Dados do formulário enviados:", formData);
      // Lógica para enviar os dados atualizados ao backend
    };
  
    if (loading) return <p>Loading...</p>;


  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
        {/* ID (somente leitura) */}
        <InputField
          label="ID"
          className="cursor-none"
          value={formData._id}
          name="_id"
          placeholder="Enter the ID"
          disabled
        />
        {/* Título */}
        <InputField
          label="Title"
          value={formData.title}
          name="title"
          onChange={handleInputChange}
          placeholder="Enter the title"
        />
        {/* Descrição */}
        <InputField
          label="Description"
          value={formData.description}
          name="description"
          onChange={handleInputChange}
          placeholder="Enter a brief description"
        />
        {/* Conteúdo */}
        <MarkdownInput
          label="Content"
          value={formData.content}
          name="content"
          onChange={(value) =>
            setFormData((prevData) => ({ ...prevData, content: value }))
          }
        />
        {/* Categorias */}
        <MultiCategoryInput
          label="Categories"
          categories={formData.categories}
          onChange={(categories) =>
            setFormData((prevData) => ({ ...prevData, categories }))
          }
        />
        {/* Tags */}
        <InputField
          label="Tags"
          value={formData.tags}
          name="tags"
          onChange={handleInputChange}
          placeholder="Enter the tags"
        />
        {/* Data de publicação */}
        <DatePickerField
          label="Release Date"
          value={formData.releaseDate}
          name="releaseDate"
          onChange={(date) =>
            setFormData((prevData) => ({ ...prevData, releaseDate: date }))
          }
        />
        {/* URL da imagem */}
        <InputField
          label="Image URL"
          value={formData.imageUrl}
          name="imageUrl"
          onChange={handleInputChange}
          placeholder="Enter the image URL"
        />
        {/* URL do vídeo */}
        <InputField
          label="Video ID"
          value={formData.videoUrl}
          name="videoUrl"
          onChange={handleInputChange}
          placeholder="Enter the youtube video ID"
        />
        {/* Autor */}
        <InputField
          label="Author"
          value={formData.author}
          name="author"
          onChange={handleInputChange}
          placeholder="Enter the author's name"
        />
        {/* Botão de Enviar */}
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}
