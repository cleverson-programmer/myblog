//Toda lógica de manipualção de dados no banco de dados

const database = require('../config/database');
const { ObjectId } = require('mongodb');

//Fn que retorna todos os artigos, usada no botão de "ver mais"
async function getAllArticles(){
    const db = await database.connect();
    return db.collection('articles').find().toArray();
}

//Retorna o artigo com o id que foi passado
async function getArticleId(id) {
    const db = await database.connect();
    return db.collection('articles').findOne({ _id: new ObjectId(id) });
}

const PAGE_SIZE = 5

//Fn que retorna os artigos referentes a paginação "retorna de 5 em 5"
async function findArticles(page = 1){

    //Lógica para criar a paginação,pegamos a pagina atual que sempre começa na 1, subtraimos de 1 e multiplicamos pela quantidade de items de cada página
    //Passomos o skip que é o que deve pular com o valor de totalSkip e o limit que é a quantidade a ser exibida em 5.
    const totalSkip = (page - 1) * PAGE_SIZE
    //Atribuindo a chamada da nossa função de conexão ao banco e a partir da atribuição manipulando os dados.
    const db = await database.connect();
    return db
            .collection('articles')
            .find({})
            .sort({ releaseDate: -1 }) // Ordena do mais recente para o mais antigo
            .skip(totalSkip)
            .limit(PAGE_SIZE)
            .toArray()
}

//Retorna a quantidade de documentos presentes no banco de dados
async function countArticles() {
    const db = await database.connect();
    const count = await db.collection('articles').countDocuments();
    return count;
}

// Função para buscar artigos
async function searchArticles(query) {
    const db = await database.connect();

    return db
    .collection('articles')
    .find(
        { $text: { $search: query } }, // Realiza a busca textual
        { projection: { score: { $meta: "textScore" } } } // Inclui a relevância nos resultados
    )
    .sort({ score: { $meta: "textScore" }, releaseDate: -1 }) // Ordena por relevância e depois por data
    .toArray();
}


//Fn que insere artigo no banco de dados
async function insertArticle(article){
    const db = await database.connect();
    return db
            .collection('articles')
            .insertOne(article)
}

//Função para atualizar artigo
async function updateArticle(id, article){
    //Retorna o JSON com as informações
    const db = await database.connect();

    return db
            .collection("articles")
            //O $set atualiza somente os campos especificados no documento correspondente ao critério de consulta ({ _id: objectId } neste caso)
            //No caso quando chamar essa função devemos passar o id e o article que é um objeto contendo as propriedades do banco que vamos modificar
            .updateOne({ _id: new ObjectId(id)}, { $set: article})
}


async function deleteArticle(id){
    const db = await database.connect();
    return db
            .collection("articles")
            .deleteOne({_id: new ObjectId(id)})
}


module.exports = {
    PAGE_SIZE,
    getAllArticles,
    getArticleId,
    findArticles,
    countArticles,
    searchArticles,

    insertArticle,
    updateArticle,
    deleteArticle
}