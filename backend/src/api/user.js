const { validateUser, validateUserPatch, validateAdmin, validateResetPassword } = require('../middlewares/validationMiddlewares')
const { ADMIN_PROFILE } = require('../utils/profile')
const { validateToken } = require('../controller/authController')
const bcrypt = require('bcryptjs')
const nodemailer = require("nodemailer");
const logger = require('../config/logger')
const { log } = require('winston')
const crypto = require('crypto')

const database = require('../config/database');
const { ObjectId } = require('mongodb');

module.exports = (app, repository) =>{

    const URL_FRONTEND = process.env.ORIGIN

    // Configuração do transporte do Nodemailer
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.NODEMAILER_USER,
            pass: process.env.NODEMAILER_PASS,
        },
    });


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

    //Atualiza usuário por email (ADICIONAR MIDDLEWARE DE VALIDAÇÃO DE EMAIL)
    app.get('/user/:email', async (req, res, next) =>{

       const user = await repository.getUserByEmail(req.params.email)
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
            // Cria um token único para validar acesso a rota de confirmação de email
            const token = crypto.randomBytes(32).toString("hex");

            const expiryDate = new Date(Date.now() + 24 * 60 * 60 * 1000); // Expira em 24 horas

            const user = await repository.insertUser({
                email,
                password,
                tokenExpiry: expiryDate,
                emailToken: token,
            });

            
            const mailOptions = {
                from: process.env.NODEMAILER_USER,
                to: email,
                subject: "Confirmação de Registro - Devlearn",
                html: `
                    <h1>Bem-vindo ao Devlearn!</h1>
                    <p>Olá, obrigado por se registrar. Confirme seu email clicando no link abaixo:</p>
                    <a href="${URL_FRONTEND}/confirm-email?email=${email}&token=${token}">Confirmar Email</a>
                `,
            };

            await transporter.sendMail(mailOptions);
    
            res.status(201).json({ message: "Usuário registrado com sucesso. Verifique seu email para confirmação." });
        } catch (error) {
            console.error("Error inserting user:", error);
            res.status(500).json({ error: "Failed to insert user and send email "});
        }
    });

    //Rota para lidar com a confirmação de email
    app.get('/confirm-email', async (req, res) => {
        const { email, token } = req.query;
    
        if (!email || !token) {
            return res.status(400).json({ error: "Email e token são obrigatórios para confirmação." });
        }
    
        try {
            
            // Busca o usuário no banco
            const user = await repository.findUserByEmail(email, token);
    
            if (!user) {
                return res.status(404).json({ error:  "Link inválido ou expirado." });
            }
    
            // Atualiza o status de confirmação do email
            await repository.confirmUserEmail(email);
    
            res.status(200).send("Confirmed");
        } catch (error) {
            console.error("Erro ao confirmar email:", error);
            res.status(500).json({ error: "Erro ao confirmar email." });
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


    //Routes reset password

    app.post('/password-reset/request', async (req, res) => {
        const { email } = req.body;
    
        try {
            console.log('Email antes da função de repository', email)
            const user = await repository.getUserByEmail(email);

            console.log('Email depois da função de repository', email)
            console.log('USER depois da função de repository', user)
            if (!user) {
                return res.status(404).json({ message: 'Email não encontrado.' });
            }
    
            // Gerar um token para redefinição de senha
            const resetToken = crypto.randomBytes(32).toString('hex');
            const tokenExpiry = new Date(Date.now() + 3600000); // Token válido por 1 hora
    
            // Salvar o token e o prazo de expiração no banco
            await repository.updateUser(user._id, {
                resetPasswordToken: resetToken,
                tokenExpiry: tokenExpiry,
            });
    
            // Enviar email com o link de redefinição
            const resetLink = `${URL_FRONTEND}/password-reset/confirm?token=${resetToken}`;
            await transporter.sendMail({
                from: process.env.NODEMAILER_USER,
                to: email,
                subject: 'Redefinição de Senha',
                html: `
                    <p>Você solicitou a redefinição de sua senha.</p>
                    <p>Clique no link abaixo para criar uma nova senha:</p>
                    <a href="${resetLink}">Redefinir Senha</a>
                    <p>Este link é válido por 1 hora.</p>
                `,
            });
    
            res.status(200).json({ message: 'Email de redefinição enviado com sucesso.' });
        } catch (error) {
            console.error('Erro ao solicitar redefinição de senha:', error);
            res.status(500).json({ message: 'Erro ao solicitar redefinição de senha.' });
        }
    });

    //Rota quando o usuário clica no link de redefinir senha
    //Adicionar middleware de verificação de senha
    app.post('/password-reset/confirm', validateResetPassword, async (req, res) => {
        const { token, newPassword } = req.body;
    
        try {
            // Buscar o usuário pelo token
            const user = await repository.getUserByResetToken(token);
    
            if (!user) {
                return res.status(404).json({ message: 'Token inválido ou expirado.' });
            }
    
            // Verificar se o token expirou
            if (new Date() > user.tokenExpiry) {
                return res.status(400).json({ message: 'Token expirado.' });
            }
    
            // Atualizar a senha do usuário
            const hashedPassword = bcrypt.hashSync(newPassword, 12);
            const db = await database.connect();

            await db.collection("users").updateOne(
                { _id: new ObjectId(user._id) },
                {
                    $set: { password: hashedPassword },
                    $unset: { resetPasswordToken: "", tokenExpiry: "" }, // Remove os campos
                }
            );
    
            res.status(200).json({ message: 'Senha redefinida com sucesso.' });
        } catch (error) {
            console.error('Erro ao redefinir senha:', error);
            res.status(500).json({ message: 'Erro ao redefinir senha.' });
        }
    });

}