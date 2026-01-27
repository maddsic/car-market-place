const Joi = require("joi");

exports.carSchema = Joi.object({
  userId: Joi.string()
    .required()
    .messages({ "any.required": "User ID is required" }),

  condition: Joi.string().required().messages({
    "any.required": "Condition is required!",
  }),

  make: Joi.string()
    .required()
    .messages({ "any.required": "Make is required" }),

  model: Joi.string()
    .required()
    .messages({ "any.required": "Model is required" }),

  year: Joi.string()
    .required()
    .messages({ "any.required": "Year is required" }),

  price: Joi.string()
    .required()
    .messages({ "any.required": "Price is required" }),

  mileage: Joi.string()
    .required()
    .messages({ "any.required": "Mileage is required" }),

  fuelType: Joi.string()
    .required()
    .messages({ "any.required": "Fuel Type is required" }),

  // description: Joi.string().optional(),
  carType: Joi.string()
    .required()
    .messages({ "any.required": "Car Type is required" }),

  engineType: Joi.string()
    .required()
    .messages({ "any.required": "Engine Type is required" }),

  transmission: Joi.string()
    .required()
    .messages({ "any.required": "transmission is required" }),

  ext_color: Joi.string()
    .required()
    .messages({ "any.required": "Exterior color is required" }),

  location: Joi.string()
    .required()
    .messages({ "any.required": "Location is required" }),

  // imageUrl: Joi.string()
  //   .required()
  //   .messages({ "any.required": "Upload atleast one photo" }),

  imageUrl: Joi.string().optional(),
  drive: Joi.string().optional(),
  int_color: Joi.string().optional(),
  vin: Joi.string().optional(),
  lng: Joi.string().optional(),
  lat: Joi.string().optional(),
  air_condition: Joi.string().optional(),
  backup_camera: Joi.string().optional(),
  cruis_control: Joi.string().optional(),
  navigation: Joi.string().optional(),
  bluetooth: Joi.string().optional(),
  audio: Joi.string().optional(),
  stereo: Joi.string().optional(),
  dvd: Joi.string().optional(),
  airbag_passenger: Joi.string().optional(),
  airbag_driver: Joi.string().optional(),
  security_system: Joi.string().optional(),
  antilock: Joi.string().optional(),
  heated_seats: Joi.string().optional(),
  power_seats: Joi.string().optional(),
  bucket_seat: Joi.string().optional(),
  leater_seat: Joi.string().optional(),
  seller_note: Joi.string().optional(),
});
