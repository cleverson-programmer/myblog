//Morgan faz logs no console, express nosso framework e helmet faz a segurança 1 linha protege contra 11 tipos de ataques conhecidos

//Para que o nosso middleware global de erro possa tratar os erros assincronos do nosso código, principalmente das rotas, também podemos fazer um tratamento específico para cada rota com try/catch ou então um hibrido com tratamento global e algumas rotas específicas

require('express-async-errors')
const express = require('express');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const logger = require('../config/logger')

const { emailConfirmation } = require('../middlewares/validationMiddlewares')
const authController = require('../controller/authController')

let server = null;

async function start(apis) {
    const app = express();

    app.use(helmet());
    app.use(morgan('dev'))

    // Configuração básica do CORS, permite requisições de origens diferentes no frontend
    app.use(
        cors({
          origin: process.env.ORIGIN,
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization'],
        })
      );

    //Para trabalhar com cookies para autenticação por exemplo, trafegando entre microserviços
    app.use(cookieParser())
    app.use(express.json())

    // Configuração do rate limiter
    const limiter = rateLimit({
        windowMs: 30 * 60 * 1000, // 30 minutos
        max: 100, // Limite de 100 requisições por IP
        message: 'Você excedeu o limite de uso. Tente novamente mais tarde.',
        standardHeaders: true, // Inclui os cabeçalhos padrão `RateLimit-*`
        legacyHeaders: false,
    });

    const authLimiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutos
        max: 5, // Apenas 5 tentativas de login permitidas por janela
        message: 'Muitas tentativas de login. Tente novamente mais tarde.',
    });

    // Aplicando o rate limiter em todas as rotas
    app.use(limiter);

    app.get('/health', (req, res, next) => {
        res.send(`The service ${process.env.SERVICE_NAME} is running at ${process.env.PORT}`);
    })

    app.post('/login', emailConfirmation, authLimiter, authController.validateLoginSchema, authController.doLogin)
    
    //Tudo vai passar pela validação para ver se o token atual do usuário está blacklistado
    app.use(authController.validateBlackList)

    // //Tudo vai passar pela validação para ver se o token atual do usuário está blacklistado
    app.use(authController.validateBlackList)
    app.post('/logout', authController.validateToken, authController.doLogout)

    // Conecta cada API com seu respectivo repositório
    apis.forEach(({ api, repository }) => {
        api(app, repository);
    });

    //Middleware de tratamento de erro global, middleware padrão do express, gestão centralizada de erros
    //Logging para rastreamento de erros, registrar os dados em determinados momentos, lib winston é o logger mais famoso para nodejs
    app.use((err, req, res, next) => {
        logger.error(`${err.stack}`);
        res.status(500).json({ message: 'An unexpected error occurred' });
    });

    server = app.listen(process.env.PORT, () => {
        console.log(`The service ${process.env.SERVICE_NAME} already started at ${process.env.PORT}`);
    })

    return server;
}

async function stop() {
    if (server) await server.close();
    return true;
}

module.exports = { start, stop }