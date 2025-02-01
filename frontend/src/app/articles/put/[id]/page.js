"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { getArticleById } from "@/store/slices/articleIdSlice";
import { putEditArticleThunk, resetPutState } from '@/store/slices/putArticleSlice';

import DatePickerField from "@/components/articles/DatePickerField";
import InputField from "@/components/articles/InputField";
import TextEditor from "@/components/articles/textEditor";
import MultiCategoryInput from "@/components/articles/MultiSelectField";
import { Header } from "@/components/home/nav/header";

import Notification from "@/utils/notification";
import AdminRoute from "@/validations/adminRoute";
import Loading from "@/utils/loading";

export default function PagePut() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const { article, loading } = useSelector((state) => state.article);
    const { loading: updating, success, error } = useSelector((state) => state.putArticle);

    const [type, setType] = useState("success");
    const [notification, setNotification] = useState(null);

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

    useEffect(() => {
      if (success) {
        setNotification(`Article successfully edit! ID: ${id}`);
        setType("success");

        setFormData({
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
        dispatch(resetPutState()); // Resetar estado
      }
      if (error) {
        setType("error");
        setNotification('Failed to update article!')
        
      }
    }, [success, id, error, dispatch]);
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log(formData)

      // Cria uma cópia do formData sem o campo _id
      const { _id, ...articleData } = formData;

      dispatch(putEditArticleThunk({ id, articleData }));
    };
  
    if (loading) return <Loading/>;


  return (
    <AdminRoute>
      <Header />
      <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-4">
        <Notification
          message={notification}
          type={type}
          onClose={() => setNotification("")}
        />
        {/* ID (somente leitura) */}
        <InputField
          label="ID"
          value={formData._id}
          name="_id"
          onChange={handleInputChange}
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
        <TextEditor
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
          disabled={updating}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {updating ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </AdminRoute>
  );
}
