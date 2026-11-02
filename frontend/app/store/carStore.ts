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
  isLoading: boolean;
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

  // true until all four requests have finished
  isLoading: true,

  fetchCarData: async () => {
    // Helper that fetches one url and never throws
    const safeGetCarData = async (url: string) => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          console.warn(`[API Alert] ${url} returned status ${response.status}`);
          return [];
        }
        const json = await response.json();
        // Return json.data if it exists, otherwise the json itself or an empty list
        return json?.data || (Array.isArray(json) ? json : []);
      } catch (err) {
        console.error(`[API Error] Direct fetch failed for ${url}:`, err);
        return [];
      }
    };

    // Run all four requests at the same time and wait for all of them
    safeGetCarData(apiEndpoints.carMakes).then((makes) => set({ carMakes: makes })),
      safeGetCarData(apiEndpoints.carBodyTypes).then((types) => set({ carBodyTypes: types })),
      safeGetCarData(apiEndpoints.premiumCars).then((cars) => set({ premiumCars: cars })),
      safeGetCarData(apiEndpoints.latestCars).then((cars) => set({ latestCars: cars })),

      set({ isLoading: false });
  },
}));
