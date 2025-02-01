const { schema, schemaPatch } = require("../schemas/articleSchema")
const {userSchema, userSchemaPatch, passwordSchema}  = require("../schemas/userSchema")
const { findUserByEmail } = require("../repository/repositoryUsers")

const { ADMIN_PROFILE } = require('../utils/profile')

const jwt = require('jsonwebtoken')

function validateArticle(req, res, next){

    const { error } = schema.validate(req.body)
    if(error){

        //propriedade de dentro de error
        const { details } = error
        //Status 422 é quando recebe uma entidade no corpo da requisição que está inválida, não segue a regra de negócio da aplicação
        return res.status(422).json(details.map( m => m.message))
    }

    //Se passou na validação já avança e manda executar o proximo middleware
    next()
}

function validateArticlePatch(req, res, next){

    if(!req.body) return res.status(422).json('Undefined fields')

    const { error } = schemaPatch.validate(req.body)
    if(error){

        //propriedade de dentro de error
        const { details } = error
        //Status 422 é quando recebe uma entidade no corpo da requisição que está inválida, não segue a regra de negócio da aplicação
        return res.status(422).json(details.map( m => m.message))
    }

    //Se passou na validação já avança e manda executar o proximo middleware
    next()
}

function validateUser(req, res, next){

    const { error } = userSchema.validate(req.body)
    if(error){

        //propriedade de dentro de error
        const { details } = error
        //Status 422 é quando recebe uma entidade no corpo da requisição que está inválida, não segue a regra de negócio da aplicação
        return res.status(422).json(details.map( m => m.message))
    }

    //Se passou na validação já avança e manda executar o proximo middleware
    next()
}

function validateResetPassword(req, res, next) {
    if (!req.body) return res.status(422).json('Campos indefinidos');
  
    const { error } = passwordSchema.validate(req.body.password); // Validando apenas o campo password
  
    if (error) {
      const { details } = error;
      // Filtrando erros relacionados ao padrão para permitir espaços
      const filteredErrors = details.filter(detail => detail.message.indexOf('pattern') !== -1);
      return res.status(422).json(filteredErrors.map(m => m.message));
    }
  
    next();
}

function validateUserPatch(req, res, next){

    if(!req.body) return res.status(422).json('Undefined fields')

    const { error } = userSchemaPatch.validate(req.body)
    if(error){

        //propriedade de dentro de error
        const { details } = error
        //Status 422 é quando recebe uma entidade no corpo da requisição que está inválida, não segue a regra de negócio da aplicação
        return res.status(422).json(details.map( m => m.message))
    }

    //Se passou na validação já avança e manda executar o proximo middleware
    next()
}

async function emailConfirmation(req, res, next) {
    const { email } = req.body; // Assumindo que o email está no corpo da requisição

    if (!email) {
        return res.status(400).json({ error: "Email é obrigatório." });
    }

    try {
        const user = await findUserByEmail(email);

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado." });
        }

        if (!user.emailConfirmed) {
            return res.status(403).json({ error: "Email ainda não confirmado." });
        }

        next(); // Permite o fluxo continuar se o email foi confirmado
    } catch (error) {
        console.error("Erro ao validar email:", error);
        res.status(500).json({ error: "Erro interno ao validar email." });
    }
}

//Função para verificar se o usuário tem permissões de admin ou não Authorization
function validateAdmin(req, res, next){
    const { profileId } = res.locals;

    if(profileId == ADMIN_PROFILE)
        next()
    else
    //Status 403 forbidden, autenticado mas com permissão negada
        res.sendStatus(403)
}

module.exports = {
    validateArticle,
    validateArticlePatch,
    validateUser,
    validateUserPatch,
    emailConfirmation,
    validateResetPassword,

    validateAdmin,
}