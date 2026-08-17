import { create } from "zustand";
import { BodyType, CarMake, CarModel, LatestCar, PremiumCar } from "./carStoreInterfaces";
import { apiEndpoints } from "./apiEndpoints";

interface CarStore {
  carMakes: CarMake[];
  setCarMakes: (carMakes: CarMake[]) => void;
  carBodyTypes: BodyType[];
  setCarBodyTypes: (carBodyTypes: BodyType[]) => void;
  premiumCars: PremiumCar[];
  setPremiumCars: (premiumCars: PremiumCar[]) => void;
  latestCars: LatestCar[];
  setLatestCars: (latestCars: LatestCar[]) => void;
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
  setPremiumCars: (premiumCars: PremiumCar[]) => set({ premiumCars }),
  latestCars: [],
  setLatestCars: (latestCars: LatestCar[]) => set({ latestCars }),
  carModels: [],
  setCarModels: (carModels: CarModel[]) => set({ carModels }),

  fetchCarData: async () => {
    // Helper function using direct native fetch
    const safeGetCarData = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`[API Alert] ${url} returned status ${response.status}`);
          return [];
        }
        const json = await response.json();
        // Return json.data if it exists, otherwise the json object or empty array
        return json?.data || (Array.isArray(json) ? json : []);
      } catch (err) {
        console.error(`[API Error] Direct fetch failed for ${url}:`, err);
        return [];
      }
    };

    try {
      safeGetCarData(apiEndpoints.carMakes).then((makes) => set({ carMakes: makes }));
      safeGetCarData(apiEndpoints.carBodyTypes).then((bodyTypes) => set({ carBodyTypes: bodyTypes }));
      safeGetCarData(apiEndpoints.premiumCars).then((premium) => set({ premiumCars: premium }));
      safeGetCarData(apiEndpoints.latestCars).then((latest) => set({ latestCars: latest }));
    } catch (error) {
      console.error("Error running store fetch:", error);
    }
  },
}));
