export interface CarModel {
  id: string;
  name: string;
}

// create export interface for carMake
export interface CarMake {
  id: string;
  name: string;
  CarModels: CarModel[];
}

export interface BodyType {
  id: string;
  typeName: string;
}

export interface PremiumCar {
  carId: string;
  make: string;
  model: string;
  price: number;
  imageUrl: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  stockNumber: string;
  status: string;
}

export interface LatestCar {
  carId: string;
  make: string;
  model: string;
  price: number;
  image: string;
  imageUrl: string;
  mileage: number;
  transmission: string;
  fuelType: string;
  stockNumber: string;
  status: string;
  owner?: {
    first_name: string;
    last_name: string;
    phone: string;
    avatarUrl?: string;
  };
}
