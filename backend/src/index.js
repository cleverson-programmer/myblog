//conexão mongodb: mongod --dbpath C:\Users\clevi\Desktop\blog-service\backend\data
const articlesAPI = require('./api/article');
const articlesRepository = require('./repository/repositoryArticles');

const usersAPI = require('./api/user'); 
const usersRepository = require('./repository/repositoryUsers');

const server = require('./server/server');

async function dependencies() {
    try {
        //Fazendo setup de configuração para aclopar no servidor nossa api e nosso modulo de manipulação do ao banco
        //Inversão de depêndencias, módulos separados falicitando testes e integração no final
        // Inicia o servidor com ambas as APIs e seus repositórios
        await server.start([
            { api: articlesAPI, repository: articlesRepository },
            { api: usersAPI, repository: usersRepository }
        ]);
    } catch (error) {
        console.error(error);
    }
}

dependencies();