const Joi = require("joi");

exports.carSchema = Joi.object({
  userId: Joi.string().required(),
  condition: Joi.string().required(),
  make: Joi.string().required(),
  model: Joi.string().required(),
  // Use coerce() so "2023" (string) becomes 2023 (number)
  year: Joi.number().integer().coerce().optional(),
  price: Joi.number().coerce().required(),
  mileage: Joi.number().required(),
  fuelType: Joi.string().required(),
  carType: Joi.string().required(),
  engineType: Joi.string().required(),
  transmission: Joi.string().required(),
  location: Joi.string().required(),
  // Changed to optional to match your frontend Zod
  ext_color: Joi.string().optional().allow(""),
  drive: Joi.string().optional().allow(""),
  int_color: Joi.string().optional().allow(""),
  vin: Joi.string().optional().allow(""),
  lng: Joi.string().optional().allow(""),
  lat: Joi.string().optional().allow(""),
  seller_note: Joi.string().optional().allow(""),

  // Image URL is handled by Multer, so we allow any here
  imageUrl: Joi.any().optional(),

  // The Checkbox Fix: allows "true" string to become true boolean
  air_condition: Joi.boolean().truthy("on", "true").optional().default(false),
  backup_camera: Joi.boolean().truthy("on", "true").optional().default(false),
  cruis_control: Joi.boolean().truthy("on", "true").optional().default(false),
  navigation: Joi.boolean().truthy("on", "true").optional().default(false),
  bluetooth: Joi.boolean().truthy("on", "true").optional().default(false),
  audio: Joi.boolean().truthy("on", "true").optional().default(false),
  stereo: Joi.boolean().truthy("on", "true").optional().default(false),
  dvd: Joi.boolean().truthy("on", "true").optional().default(false),
  airbag_passenger: Joi.boolean().truthy("on", "true").optional().default(false),
  airbag_driver: Joi.boolean().truthy("on", "true").optional().default(false),
  security_system: Joi.boolean().truthy("on", "true").optional().default(false),
  antilock: Joi.boolean().truthy("on", "true").optional().default(false),
  heated_seat: Joi.boolean().truthy("on", "true").optional().default(false),
  power_seat: Joi.boolean().truthy("on", "true").optional().default(false),
  bucket_seat: Joi.boolean().truthy("on", "true").optional().default(false),
  leather_seat: Joi.boolean().truthy("on", "true").optional().default(false),
});
