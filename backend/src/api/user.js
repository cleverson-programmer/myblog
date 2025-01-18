const { validateUser, validateUserPatch, validateAdmin, ADMIN_PROFILE} = require('../middlewares/validationMiddlewares')
const { validateToken } = require('../controller/authController')
const bcrypt = require('bcryptjs')

const logger = require('../config/logger')
const { log } = require('winston')

module.exports = (app, repository) =>{

    //Quantidade total de users
    app.get('/users/total', validateToken, validateAdmin, async (req, res) => {
        const totalUsers = await repository.countUsers();
        res.json({ total: totalUsers });
    });

    //User por ID, o usuário só tem acesso ao usuário por ID referente ao seu próprio ID
    // Adicionar verificação para que o usuário só possa acessar o user/:id passado que seja o mesmo do token do usuário autenticado que está tentando acessar esse id
    app.get('/user/:id', validateToken, async (req, res, next) =>{

         // Verifica se o ID do token corresponde ao ID da rota
         if (res.locals.userId !== req.params.id && res.locals.profileId !== ADMIN_PROFILE) {
            return res.sendStatus(403); // Forbidden - acesso negado
        }

        const user = await repository.getUserId(req.params.id)
        if(!user) return res.sendStatus(404)
        
        res.json(user)
    })

    //Retorna todos os users, ou a quantidade passada
    app.get('/users', validateToken, validateAdmin, async (req, res, next) => {
        const { page } = req.query;
    
        // Se "page" for fornecido, usa paginação
        if (page) {
            const pageNum = parseInt(page, 10);
            if (isNaN(pageNum) || pageNum < 1) {
                return res.status(400).json({ message: 'Invalid page number' });
            }
    
            const users = await repository.findUsers(pageNum);
            if (!users || !users.length) {
                return res.status(404).json({ message: 'No users found for this page' });
            }
            return res.json(users);
        }
    
        // Caso "page" não seja fornecido, retorna todos os users
        const users = await repository.getAllUsers();
        if (!users || !users.length) {
            return res.status(404).json({ message: 'No users found' });
        }
    
        res.json(users);
    });

    app.post('/user/new', validateUser, async (req, res, next) => {
    
        const {email, password } = req.body;
    
        try {
            const user = await repository.insertUser({
                email,
                password
            });
    
            res.status(201).json(user);
        } catch (error) {
            console.error("Error inserting user:", error);
            res.status(500).json({ error: "Failed to insert user "});
        }
    });

    //rota para admin adicionar novo admin
    app.post('/admin/user/new', validateToken, validateAdmin, validateUser, async (req, res, next) => {
    
        const { email, password } = req.body;
        console.log(email, password)
    
        try {
            // Chama a função específica para criar usuários administradores
            const adminUser = await repository.insertAdminUser({
                email,
                password
            });
    
            res.status(201).json(adminUser);
        } catch (error) {
            console.error("Error inserting admin user:", error);
            res.status(500).json({ error: "Failed to insert admin user" });
        }
    });

    //Atualizando todo o user
    app.put('/user/:id', validateToken, validateAdmin, validateUser, async (req, res) => {
        const userId = req.params.id;
        const updatedUser = req.body;

        // Criptografa a senha se ela for enviada na atualização
        if (updatedUser.password) {
        updatedUser.password = bcrypt.hashSync(updatedUser.password, 12);
        }

        // Chama a função para atualizar o user no banco
        const result = await repository.updateUser(userId, updatedUser);

        // Verifica se o user foi encontrado e atualizado
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        // Retorna o sucesso da atualização
        res.status(200).json(result);
    });

    //Atualizando um trecho do user
    app.patch('/user/:id', validateToken, validateAdmin, validateUserPatch, async (req, res) => {
        const userId = req.params.id;
        const updatedUser = req.body;

        // Criptografa a senha se ela for enviada na atualização
        if (updatedUser.password) {
            updatedUser.password = bcrypt.hashSync(updatedUser.password, 12);
        }

        // Chama a função para atualizar o user no banco
        const result = await repository.updateUser(userId, updatedUser);

        // Verifica se o user foi encontrado e atualizado
        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: 'User not found or no changes made' });
        }

        // Retorna o sucesso da atualização
        res.status(200).json(result);
    });


    //deletar user do banco
    app.delete('/user/:id', validateToken, validateAdmin, async (req, res, next) =>{
        const id = req.params.id
        const result = await repository.deleteUser(id)

        res.sendStatus(204)
    })

}