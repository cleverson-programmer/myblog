const articles = [
    {
        "_id": "6775a6a57b09857e1e906e9b",
        "title": "Aprendendo JavaScript: Guia Completo",
        "description": "Um guia completo para aprender os fundamentos de JavaScript.",
        "content": "JavaScript é uma linguagem de programação versátil usada tanto no frontend quanto no backend. Neste guia, abordaremos...",
        "categories": ["JavaScript", "Programação"],
        "tags": "javascript, frontend, backend, desenvolvimento",
        "releaseDate":new Date("2025-01-01T10:00:00Z"),
        "imageUrl": "https://meusite.com/images/javascript-guia.png",
        "videoUrl": "https://meusite.com/videos/javascript-guia.mp4"
      },
      {
        "_id": "6775a6a57b09857e1e906e9b",
        "title": "Node.js e Express: Criando APIs do Zero",
        "description": "Aprenda a criar APIs com Node.js e Express passo a passo.",
        "content": "Neste artigo, vamos explorar como construir APIs RESTful usando Node.js e Express...",
        "categories": ["Node.js", "APIs", "Backend"],
        "tags": "nodejs, express, apis, backend",
        "releaseDate":new Date("2025-01-02T15:30:00Z"),
        "imageUrl": "https://meusite.com/images/nodejs-express.png",
        "videoUrl": "https://meusite.com/videos/nodejs-express.mp4"
      },
      {
        "_id": "6775a6a57b09857e1e906e9b",
        "title": "Como Dominar o MongoDB em 7 Dias",
        "description": "Estratégias e dicas para dominar o MongoDB rapidamente.",
        "content": "MongoDB é um banco de dados NoSQL poderoso e flexível. Neste artigo, você aprenderá como criar coleções, modelar dados e...",
        "categories": ["Banco de Dados", "MongoDB"],
        "tags": "mongodb, banco de dados, nosql, desenvolvimento",
        "releaseDate":new Date("2025-01-03T08:00:00Z"),
        "imageUrl": "https://meusite.com/images/mongodb-dicas.png",
        "videoUrl": "https://meusite.com/videos/mongodb-dicas.mp4"
      }
]

async function getAllArticles(){
    return articles
}

async function getArticleId(id){
    if( id == -1 ) return null
  
  articles[0]._id = id
  return articles[0]
}

const PAGE_SIZE_MOCK = 5;

async function findArticles(page = 1) {
  const totalSkip = (page - 1) * PAGE_SIZE_MOCK;
  return articles.slice(totalSkip, totalSkip + PAGE_SIZE_MOCK);
}

async function countArticles() {
  return articles.length;
}

async function insertArticle(article){
  articles.push(article);
  return article;
}

async function updateArticle(id, updatedArticle) {
  const index = articles.findIndex(article => article._id === id);
  if (index === -1) {
    throw new Error("Artigo não encontrado");
  }
  articles[index] = { ...articles[index], ...updatedArticle };
  return articles[index];
}

async function deleteArticle(id){
  const index = articles.findIndex((article) => article._id === id);
  if (index === -1) throw new Error('Artigo não encontrado');
  articles.splice(index, 1); // Remove o artigo do array mockado
  return true;
}


module.exports = {
    getAllArticles,
    getArticleId,
    countArticles,
    findArticles,
    PAGE_SIZE_MOCK,
    insertArticle,
    updateArticle,
    deleteArticle
}