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
