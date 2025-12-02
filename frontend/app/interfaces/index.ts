export interface CarModel {
  id: string;
  name: string;
}

export interface CarMake {
  id: string;
  name: string;
  CarModels: CarModel[];
}

export interface Owner {
  userId: string;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  isVerified: Boolean;
  role: string;
  cars: Car;
}

interface carImage {
  imageId: string;
  imageUrl: string;
  isPrimary: boolean;
}

export interface Car {
  carId: string;
  stockNumber: string;
  condition: string;
  make: string;
  model: string;
  year: string;
  price: string;
  drive: string;
  mileage: string;
  ext_color: string;
  int_color: string;
  fuelType: string;
  carType: string;
  description: string;
  imageUrl: string;
  image: string;
  images?: carImage[];
  engineType: string;
  status: string;
  transmission: string;
  createdAt: Date | string;
  owner: Owner;
}
