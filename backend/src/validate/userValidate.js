import Joi from "joi";

const userScema = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).min(8).label("password").required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({
      "any.only": "{{#label}} should match the password",
      "any.required": "{{#label}} is required"
    })
});

const userLoginScema = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).min(8).required()
});

const userUpdateScema = Joi.object({
  username: Joi.string().max(100).required(),
  passwordLama: Joi.string().max(100).min(8).required(),
  password: Joi.string().max(100).min(8).label("password").required(),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .label("Confirm Password")
    .messages({
      "any.only": "{{#label}} should match the password",
      "any.required": "{{#label}} is required"
    })
});

export { userScema, userLoginScema, userUpdateScema };
