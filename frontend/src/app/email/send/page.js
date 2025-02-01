"use client";

import React, { useState } from "react";
import { RiSendPlane2Line } from "react-icons/ri";
import { sendEmail } from "@/api/sendEmail";
import { Header } from "@/components/home/nav/header";
import Loading from "@/utils/loading"; // Importe o componente Loading

export default function SendEmail() {
  const [content, setContent] = useState("");
  const [subject, setSubject] = useState("");
  const [articleTitle, setArticleTitle] = useState("");
  const [articleImage, setArticleImage] = useState("");
  const [altArticleImage, setAltArticleImage] = useState("");
  const [articleLink, setArticleLink] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Estado para controlar o carregamento

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ativa o estado de carregamento
    setIsLoading(true);

    try {
      // Gera o conteúdo do e-mail usando os valores dos campos
      const emailContent = generateEmailContent(articleTitle, articleImage, altArticleImage, articleLink);

      // Envia o e-mail com o conteúdo gerado e o assunto
      await sendEmail(emailContent, subject);

      // Limpa os campos após o envio
      setContent("");
      setSubject("");
      setArticleTitle("");
      setArticleImage("");
      setAltArticleImage("");
      setArticleLink("");
    } catch (error) {
      console.error("Erro ao enviar o e-mail:", error);
    } finally {
      // Desativa o estado de carregamento, independentemente do resultado
      setIsLoading(false);
    }
  };

  const generateEmailContent = (articleTitle, articleImage, altArticleImage, articleLink) => `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
          }
          .email-container {
            background-color: #ffffff;
            width: 80%;
            margin: 20px auto;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            overflow: hidden;
          }
          .header {
            background-color:#2E2D78;
            color: white;
            padding: 20px;
            text-align: center;
            font-size: 24px;
            font-weight: bold;
          }
          .content {
            padding: 20px;
            color: #333;
          }
          .content h2 {
            color: #2E2D78;
            margin-top: 0;
          }
          .content p {
            line-height: 1.6;
            margin-bottom: 20px;
          }
          .cta-button {
            display: inline-block;
            background-color: #2E2D78;
            color: white;
            padding: 10px 20px;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
          }
          .cta-button:hover {
            background-color: #2E2D78;
          }
          .footer {
            background-color: #f4f4f4;
            color: #777;
            text-align: center;
            font-size: 12px;
            padding: 10px;
            margin-top: 20px;
          }
          .image-container {
            text-align: center;
            margin: 20px 0;
          }
          .image-container img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <!-- Header -->
          <div class="header">🌟 Novidade na DEVlearn! 🌟</div>

          <!-- Content -->
          <div class="content">
            <h2>Olá!</h2>
            <p>
              Estamos animados para compartilhar com você nosso novo artigo no blog! Descubra insights tecnológicos, 
              dicas valiosas e tendências que estão moldando o futuro da tecnologia.
            </p>

            <!-- Image -->
            <div class="image-container">
              <img
                src=${articleImage}
                alt=${altArticleImage}
              />
            </div>

            <p>
              Não perca nosso artigo desta semana: <strong>${articleTitle}</strong>.
            </p>
            <p>
              Além disso, estamos comprometidos em manter você atualizado com as últimas novidades. Se você ainda não 
              assinou nosso blog, agora é a hora de fazer parte da nossa comunidade!
            </p>

            <!-- Call-to-action button -->
            <a
              href=${articleLink}
              class="cta-button"
              target="_blank"
            >
              Leia o Artigo Agora
            </a>
          </div>

          <!-- Footer -->
          <div class="footer">
            Você está recebendo este email porque se cadastrou no nosso blog. Se não deseja mais receber nossas mensagens, 
            <a href="https://seusite.com/unsubscribe" style="color: white;">clique aqui</a>.
          </div>
        </div>
      </body>
    </html>
  `;

  return (
    <div className="mx-3 my-2">
      <Header />
      <div className="flex justify-center flex-col w-full border border-solid border-[#2E2D78] rounded-lg mt-10 px-10 py-4">
        <h2 className="font-medium text-xl text-center">
          Enviar email para os usuários!
        </h2>

        {/* Exibe o componente Loading enquanto a requisição estiver em andamento */}
        {isLoading && <Loading />}

        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4 mt-4">
          {/* Campo para o assunto */}
          <input
            type="text"
            name="subject"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="Digite o assunto"
            className="w-full pl-2 text-black py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Campo para o título do artigo */}
          <input
            type="text"
            name="articleTitle"
            id="articleTitle"
            value={articleTitle}
            onChange={(e) => setArticleTitle(e.target.value)}
            placeholder="Digite o título do artigo"
            className="w-full pl-2 text-black py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Campo para a URL da imagem do artigo */}
          <input
            type="text"
            name="articleImage"
            id="articleImage"
            value={articleImage}
            onChange={(e) => setArticleImage(e.target.value)}
            placeholder="Digite a URL da imagem do artigo"
            className="w-full pl-2 text-black py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Campo para o texto alternativo da imagem */}
          <input
            type="text"
            name="altArticleImage"
            id="altArticleImage"
            value={altArticleImage}
            onChange={(e) => setAltArticleImage(e.target.value)}
            placeholder="Digite o texto alternativo da imagem"
            className="w-full pl-2 text-black py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Campo para o link do artigo */}
          <input
            type="text"
            name="articleLink"
            id="articleLink"
            value={articleLink}
            onChange={(e) => setArticleLink(e.target.value)}
            placeholder="Digite o link do artigo"
            className="w-full pl-2 text-black py-2 rounded-lg bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          {/* Botão de envio */}
          <button
            type="submit"
            className="cursor-pointer text-white font-bold py-2 px-4 bg-[#2E2D78] rounded-md"
            disabled={isLoading} // Desabilita o botão durante o carregamento
          >
            {isLoading ? "Enviando..." : "Enviar"}
          </button>
        </form>
      </div>
    </div>
  );
}