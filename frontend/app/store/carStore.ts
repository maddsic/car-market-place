import { create } from "zustand";
import { apiFetch } from "~/utils/apiFetch";

// const apiBaseUrl = process.env.API_BASE_URL || "http://localhost:4000";
const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

// create interface for car model
interface CarModel {
  id: string;
  name: string;
}

// create interface for carMake
interface CarMake {
  id: string;
  name: string;
  CarModels: CarModel[];
}

interface BodyType {
  id: string;
  typeName: string;
}

// create interface for carStore
interface CarStore {
  carMakes: CarMake[];
  setCarMakes: (carMakes: CarMake[]) => void;
  carBodyTypes: BodyType[];
  setCarBodyTypes: (carBodyTypes: BodyType[]) => void;
  premiumCars: any[];
  setPremiumCars: (premiumCars: any[]) => void;
  latestCars: any[];
  setLatestCars: (latestCars: any[]) => void;
  carModels: CarModel[];
  setCarModels: (carModels: CarModel[]) => void;
  fetchCarData: () => Promise<void>;
}

export const useCarStore = create<CarStore>((set) => ({
  carMakes: [],
  setCarMakes: (carMakes: CarMake[]) => set({ carMakes }),
  carBodyTypes: [],
  setCarBodyTypes: (carBodyTypes: BodyType[]) => set({ carBodyTypes }),
  premiumCars: [],
  setPremiumCars: (premiumCars: any[]) => set({ premiumCars }),
  latestCars: [],
  setLatestCars: (latestCars: any[]) => set({ latestCars }),
  carModels: [],
  setCarModels: (carModels: CarModel[]) => set({ carModels }),

  fetchCarData: async () => {
    try {
      const endPoints = [
        {
          key: "carMakes",
          url: `${apiBaseUrl}/api/v1/cars/carmakes`,
        },
        {
          key: "carBodyTypes",
          url: `${apiBaseUrl}/api/v1/cars/bodyType`,
        },
        {
          key: "premiumCars",
          url: `${apiBaseUrl}/api/v1/cars/premium-cars`,
        },
        {
          key: "latestCars",
          url: `${apiBaseUrl}/api/v1/cars/latest-cars`,
        },
      ];

      const res = await Promise.all(endPoints.map(({ url }) => apiFetch(url)));
      console.log('"fetched car data from store"');
      console.log(res);

      const results = Object.fromEntries(
        res.map((result, index) => [endPoints[index].key, result.data]),
      );
      // SET STATE IN ZUSTAND STORE
      set({
        carMakes: results.carMakes || [],
        carBodyTypes: results.carBodyTypes || [],
        premiumCars: results.premiumCars || [],
        latestCars: results.latestCars || [],
      });
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  },
}));
