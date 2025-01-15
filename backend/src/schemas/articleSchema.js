const Joi = require('joi')
//Schema de validação de dados para nossa API, esse schema vai ser usado no middleware que fica na api nas rotas antes da função que de fato trata a rota
const schema = Joi.object({
        title: Joi.string()
            .required()
            .min(2)
            .max(150),
        description: Joi.string()
            .required()
            .min(10)
            .max(500), 
        content: Joi.string()
            .required()
            .min(10),
        releaseDate: Joi.string()
            .required()
            .regex(/^\d{4}-\d{2}-\d{2}/)
            .messages({
            "string.pattern.base": "releaseDate deve estar no formato ISO 8601 (YYYY-MM-DD).",
            "string.empty": "releaseDate é obrigatório.",
            }),
        imageUrl: Joi.string()
            .required()
            .pattern(/http?s:\/\/.+\.(jpe?g|png|gif|svg)/i),
        videoUrl: Joi.string()
            .optional()
            .min(5),
        categories:Joi.array()
            .required()
            .items(Joi.string())
            .min(1),
        tags: Joi.string()
            .required()
            .min(2)
            .max(100),
        author: Joi.string()
            .min(4)
            .required()
})

const schemaPatch = Joi.object({
    title: Joi.string()
        .optional()
        .min(2)
        .max(150),
    description: Joi.string()
        .optional()
        .min(10)
        .max(500), 
    content: Joi.string()
        .optional()
        .min(10),
    releaseDate: Joi.string()
        .optional()
        .regex(/^\d{4}-\d{2}-\d{2}/)
        .messages({
        "string.pattern.base": "releaseDate deve estar no formato ISO 8601 (YYYY-MM-DD).",
        "string.empty": "releaseDate é obrigatório.",
        }),
    imageUrl: Joi.string()
        .optional()
        .pattern(/http?s:\/\/.+\.(jpe?g|png|gif|svg)/i),
    videoUrl: Joi.string()
        .optional()
        .pattern(/http?s:\/\/.+/i),
    categories:Joi.array()
        .optional()
        .items(Joi.string())
        .min(1),
    tags: Joi.string()
        .optional()
        .min(2)
        .max(100),
    author: Joi.string()
        .optional()
        .min(4)
})

module.exports = { 
    schema,
    schemaPatch
 }