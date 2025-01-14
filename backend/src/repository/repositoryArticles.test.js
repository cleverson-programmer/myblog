const { test, expect, beforeAll } = require('@jest/globals')
const repository = require('./repository');
const { ObjectId } = require('mongodb');
const database = require('../config/database')

let testArticleId = null;

beforeAll( async () =>{
    const articles = await repository.getAllArticles()

    testArticleId = articles[0]._id
})

afterAll(async () => {
  let db = await database.connect();
  await db.collection("articles").deleteMany({ title: /teste/i }); // Remove artigos de teste

  db = await database.disconnect()
});

test('getAllArticles', async () => {
    const articles = await repository.getAllArticles()
    expect(Array.isArray(articles)).toBeTruthy();
    expect(articles.length).toBeTruthy();
})

test('countArticles', async () => {
    const initialCount = await repository.countArticles();
    expect(initialCount).toBe(5); // Verifica se há 3 artigos no mock inicialmente
  
    const newArticle = {
      "title": "teste",
      "description": "countArticles",
      "content": "Conteúdo do novo artigo.",
      "categories": ["Teste"],
      "tags": "teste, artigo",
      "releaseDate": "2025-01-05T12:00:00Z",
      "imageUrl": "https://meusite.com/images/novo-artigo.png",
      "videoUrl": "https://meusite.com/videos/novo-artigo.mp4",
    };
  
    try {
      await repository.insertArticle(newArticle);
      const updatedCount = await repository.countArticles();
      expect(updatedCount).toBe(6); // Verifica se o contador foi incrementado
    } finally {
      await repository.deleteArticle(newArticle._id);
      const finalCount = await repository.countArticles();
      expect(finalCount).toBe(5); // Verifica se voltou ao estado inicial
    }
});

test('getArticleId', async () => {
    const article = await repository.getArticleId(testArticleId);
    expect(article).toBeTruthy();
    expect(article._id).toEqual(testArticleId);
})

test('insertArticle', async () => {
    const article = {
        "title": "teste",
        "description": "insert",
        "content": "JavaScript é uma linguagem de programação versátil usada tanto no frontend quanto no backend. Neste guia, abordaremos...",
        "categories": ["JavaScript", "Programação"],
        "tags": "javascript, frontend, backend, desenvolvimento",
        "releaseDate":"2025-01-01T10:00:00Z",
        "imageUrl": "https://meusite.com/images/javascript-guia.png",
        "videoUrl": "https://meusite.com/videos/javascript-guia.mp4"
    }

    let result;

    try{
        result = await repository.insertArticle(article);
        expect(result).toBeTruthy();
    }finally{
        await repository.deleteArticle(result._id)
    }
})

test('updateArticle', async () => {
  const article = {
      "title": "teste",
      "description": "update1",
      "content": "Conteúdo inicial.",
      "categories": ["JavaScript"],
      "tags": "javascript",
      "releaseDate": "2025-01-01T10:00:00Z",
      "imageUrl": "https://meusite.com/images/javascript-guia.png",
      "videoUrl": "https://meusite.com/videos/javascript-guia.mp4"
  };

  const updatedData = {
      "title": "teste",
      "description": "update2",
      "content": "Conteúdo inicial.",
      "categories": ["JavaScript"],
      "tags": "javascript",
      "releaseDate": "2025-01-01T10:00:00Z",
      "imageUrl": "https://meusite.com/images/javascript-guia.png",
      "videoUrl": "https://meusite.com/videos/javascript-guia.mp4"
  };

  let result;
  try {
      result = await repository.insertArticle(article);
      const updatedArticle = await repository.updateArticle(result._id, updatedData);
      expect(updatedArticle).toBeTruthy();

  } finally {
      await repository.deleteArticle(result._id); // Garante a limpeza do banco
  }
});

test('deleteArticle', async () => {
    const article = {
        "title": "teste",
        "description": "delete",
        "content": "JavaScript é uma linguagem de programação versátil usada tanto no frontend quanto no backend. Neste guia, abordaremos...",
        "categories": ["JavaScript", "Programação"],
        "tags": "javascript, frontend, backend, desenvolvimento",
        "releaseDate":"2025-01-01T10:00:00Z",
        "imageUrl": "https://meusite.com/images/javascript-guia.png",
        "videoUrl": "https://meusite.com/videos/javascript-guia.mp4"
    }

    const result = await repository.insertArticle(article);

    const result2 = await repository.deleteArticle(result._id)
    expect(result2).toBeTruthy();
})