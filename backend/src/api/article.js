const { validateArticle, validateArticlePatch, validateAdmin } = require('../middlewares/validationMiddlewares')
const { validateToken } = require('../controller/authController')
const logger = require('../config/logger')
const { log } = require('winston')

module.exports = (app, repository) =>{

    //Quantidade total de artigos
    app.get('/articles/total', validateToken, async (req, res) => {
        const totalArticles = await repository.countArticles();
        res.json({ total: totalArticles });
    });

    //Artigo por ID
    app.get('/articles/:id', validateToken, async (req, res, next) =>{
        const article = await repository.getArticleId(req.params.id)
        if(!article) return res.sendStatus(404)
        
        res.json(article)
    })

    //Retorna todos os artigos, ou a quantidade passada
    app.get('/articles', validateToken, async (req, res, next) => {
        const { page } = req.query;
    
        // Se "page" for fornecido, usa paginação
        if (page) {
            const pageNum = parseInt(page, 10);
            if (isNaN(pageNum) || pageNum < 1) {
                return res.status(400).json({ message: 'Invalid page number' });
            }
    
            const articles = await repository.findArticles(pageNum);
            if (!articles || !articles.length) {
                return res.status(404).json({ message: 'No articles found for this page' });
            }
            return res.json(articles);
        }
    
        // Caso "page" não seja fornecido, retorna todos os artigos
        const articles = await repository.getAllArticles();
        if (!articles || !articles.length) {
            return res.status(404).json({ message: 'No articles found' });
        }
    
        res.json(articles);
    });

    app.post('/articles/new', validateToken, validateAdmin, validateArticle, async (req, res, next) => {
        console.log("Request Body:", req.body); // Log para verificar os dados recebidos
    
        const { title, description, content, categories, tags, releaseDate, imageUrl, videoUrl, author } = req.body;
    
        try {
            const article = await repository.insertArticle({
                title,
                description,
                content,
                categories,
                tags,
                releaseDate: new Date(releaseDate),
                imageUrl,
                videoUrl,
                author,
            });

            //Logger para saber quem registrou um novo filme, qual filme e quando foi registrado
            logger.info(`User ${res.locals.userId} add the article ${article._id} at ${new Date()}`)
    
            res.status(201).json(article);
        } catch (error) {
            console.error("Error inserting article:", error);
            res.status(500).json({ error: "Failed to insert article" });
        }
    });

    //Atualizando todo o artigo
    app.put('/articles/put/:id', validateToken, validateAdmin, validateArticle, async (req, res) => {
        const articleId = req.params.id;
        const updatedArticle = req.body;

        // Chama a função para atualizar o artigo no banco
        const result = await repository.updateArticle(articleId, updatedArticle);

        // Verifica se o artigo foi encontrado e atualizado
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Article not found or no changes made' });
        }

        // Retorna o sucesso da atualização
        res.status(200).json(result);
    });

    //Atualizando um trecho do artigo
    app.patch('/articles/patch/:id', validateToken, validateAdmin, validateArticlePatch, async (req, res) => {
        const articleId = req.params.id;
        const updatedArticle = req.body;

        // Chama a função para atualizar o artigo no banco
        const result = await repository.updateArticle(articleId, updatedArticle);

        // Verifica se o artigo foi encontrado e atualizado
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'Article not found or no changes made' });
        }

        // Retorna o sucesso da atualização
        res.status(200).json(result);
    });


    //deletar artigo do banco
    app.delete('/articles/delete/:id', validateToken, validateAdmin, async (req, res, next) =>{
        const id = req.params.id
        const result = await repository.deleteArticle(id)

        //Logger para saber quem apagou determinado artigo
        logger.info(`User ${res.locals.userId} deleted the article ${id} at ${new Date()}`)

        res.sendStatus(204)
    })

}