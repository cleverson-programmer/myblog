const Joi = require('joi');

// Schema de validação com Joi
const userSchema = Joi.object({
  email: Joi.string()
    .min(6)
    .email({ tlds: { allow: false } }) // Valida e-mails sem restringir TLDs como .com, .org
    .pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/) // Valida apenas gmail e outlook
    .required()
    .messages({
      "string.email": "Email must be valid.",
      "string.pattern.base": "The email must be gmail or outlook.",
      "any.required": "Email is required"
    }),

  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.pattern.base": "The password must contain at least one capital letter, one number and one symbol.",
      "any.required": "Password is required"
    }),
  
  emailConfirmed: Joi.boolean()
});

// Schema de validação com Joi
const userSchemaPatch = Joi.object({
    email: Joi.string()
      .min(6)
      .email({ tlds: { allow: false } }) // Valida e-mails sem restringir TLDs como .com, .org
      .pattern(/^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com)$/) // Valida apenas gmail e outlook
      .optional()
      .messages({
        "string.email": "Email must be valid.",
        "string.pattern.base": "The email must be gmail or outlook.",
        "any.required": "Email is required"
      }),
  
    password: Joi.string()
      .min(6)
      .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/)
      .optional()
      .messages({
        "string.min": "Password must be at least 6 characters long.",
        "string.pattern.base": "The password must contain at least one capital letter, one number and one symbol.",
        "any.required": "Password is required"
      })
  });

const passwordSchema = Joi.object({

  password: Joi.string()
    .min(6)
    .pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,}$/)
    .required()
    .messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.pattern.base": "The password must contain at least one capital letter, one number and one symbol.",
      "any.required": "Password is required"
    })
})

module.exports = {
    userSchema,
    userSchemaPatch,
    passwordSchema
}
