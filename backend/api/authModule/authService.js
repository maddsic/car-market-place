const Joi = require("joi");

exports.registerSchema = Joi.object({
   first_name: Joi.string().required().messages({ "any.required": "First name is required" }),
   last_name: Joi.string().required().messages({ "any.required": "Last name is required" }),
   email: Joi.string().email().required().messages({ "any.required": "email is required" }),
   password: Joi.string().required().min(8).messages({ "any.required": "Password cannot be less tha 8 characters" }),
   phone: Joi.string().required().messages({ "any.required": "phone is required" }),
   address: Joi.string().required().messages({ "any.required": "Address is required" }),
});

exports.loginSchema = Joi.object({
   email: Joi.string().email().required().messages({ "any.required": "email is required" }),
   password: Joi.string().required().messages({ "any.required": "Password is requiree." }),
});
