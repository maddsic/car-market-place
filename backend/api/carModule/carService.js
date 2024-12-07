const Joi = require("joi");

exports.carSchema = Joi.object({
   userId: Joi.string().required().messages({ "any.required": "User ID is required" }),
   make: Joi.string().required().messages({ "any.required": "Make is required" }),
   model: Joi.string().required().messages({ "any.required": "Model is required" }),
   year: Joi.number().required().messages({ "any.required": "Year is required" }),
   price: Joi.number().required().messages({ "any.required": "Price is required" }),
   mileage: Joi.number().required().messages({ "any.required": "Mileage is required" }),
   color: Joi.string().required().messages({ "any.required": "Color is required" }),
   fuelType: Joi.string().required().messages({ "any.required": "Fuel Type is required" }),
   description: Joi.string().optional(),
   carType: Joi.string().required().messages({ "any.required": "Car Type is required" }),
   engineType: Joi.string().required().messages({ "any.required": "Engine Type is required" }),
   transmission: Joi.string().required().messages({ "any.required": "transmission is required" }),
   engineType: Joi.string().required().messages({ "any.required": "Engine Type is required" }),
});
