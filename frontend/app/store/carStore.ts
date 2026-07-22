import { create } from "zustand";
import { apiFetch } from "~/utils/apiFetch";
import { BodyType, CarMake, CarModel, LatestCar, PremiumCar } from "./carStoreInterfaces";
import { apiEndpoints } from "./apiEndpoints";

// create interface for carStore
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
    try {
      const endPoints = [
        apiEndpoints.carMakes,
        apiEndpoints.carBodyTypes,
        apiEndpoints.premiumCars,
        apiEndpoints.latestCars,
      ];

      const res = await Promise.all(
        endPoints.map((endpoint) => apiFetch(endpoint)),
      );
      console.log('"fetched car data from store"');
      console.log(res[0]?.data);
      console.log(res)
      console.log("Raw API Response for Makes:", res[0]);

      const results = {
        carMakes: res[0]?.data || [],
        carBodyTypes: res[1]?.data || [],
        premiumCars: res[2]?.data || [],
        latestCars: res[3]?.data || [],
      };
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
