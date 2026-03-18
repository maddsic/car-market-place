import { z } from "zod";

const checkbox = z.preprocess(
  (val) => val === "on" || val === "true" || val === true,
  z.boolean()
).optional().default(false);

export const createListingValidateor = z.object({
  userId: z.string().nonempty("User ID is required"),
  condition: z.string().nonempty("Please select condition"),
  make: z.string().nonempty("Please select make"),
  model: z.string().nonempty("Please select model"),
  year: z.coerce.number().min(1900).max(2026),
  carType: z.string().nonempty("Please select czr type"),
  mileage: z.coerce.number().min(0, "Please select mileage").nonnegative(),
  fuelType: z.string().nonempty("Please select fuel type"),
  engineType: z.string().nonempty("Please select engine type"),
  transmission: z.string().nonempty("Please select transmssion type"),
  price: z.coerce.number().positive("Please enter a valid listing price"),
  drive: z.string().optional(),
  ext_color: z.string().optional(),
  int_color: z.string().optional(),
  vin: z.string().optional(),
  location: z.string().nonempty("Please enter location"),
  lng: z.string().optional(),
  lat: z.string().optional(),
  air_condition: checkbox,
  backup_camera: checkbox,
  cruis_control: checkbox,
  navigation: checkbox,
  bluetooth: checkbox,
  audio: checkbox,
  stereo: checkbox,
  dvd: checkbox,
  airbag_passenger: checkbox,
  airbag_driver: checkbox,
  security_system: checkbox,
  antilock: checkbox,
  heated_seat: checkbox,
  power_seat: checkbox,
  bucket_seat: checkbox,
  leather_seat: checkbox,
  imageUrl: z.array(z.any()).min(1, "Please upload at least 1 image"),
  seller_note: z.string().optional(),
});

