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

      const results = await Promise.allSettled(
        endPoints.map((endpoint) => apiFetch(endpoint)),
      );


      // Extract values safely from Promise.allSettled
      const makesRes = results[0].status === "fulfilled" ? results[0].value : null;
      const bodyTypesRes = results[1].status === "fulfilled" ? results[1].value : null;
      const premiumCarsRes = results[2].status === "fulfilled" ? results[2].value : null;
      const latestCarsRes = results[3].status === "fulfilled" ? results[3].value : null;

      console.log("Makes Response from Store Fetch:", makesRes);

      set({
        carMakes: makesRes?.data || [],
        carBodyTypes: bodyTypesRes?.data || [],
        premiumCars: premiumCarsRes?.data || [],
        latestCars: latestCarsRes?.data || [],
      });
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  },
}));
