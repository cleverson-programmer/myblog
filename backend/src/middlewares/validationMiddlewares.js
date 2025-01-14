const { schema, schemaPatch } = require("../schemas/articleSchema")
const {userSchema, userSchemaPatch}  = require("../schemas/userSchema")
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

const ADMIN_PROFILE = 1;
const GUEST_PROFILE = 2;

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

    validateAdmin,
    ADMIN_PROFILE,
    GUEST_PROFILE
}