const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://car-market-place-production.up.railway.app";
const API_VERSION = import.meta.env.VITE_API_VERSION || "/api/v1";

export const API_URL = `${BASE_URL}${API_VERSION}`;

export const apiEndpoints = {
  login: `${API_URL}/auth/login`,
  register: `${API_URL}/auth/register`,
  createCar: `${API_URL}/cars`,
  updateCar: `${API_URL}/cars/update`,
  carMakes: `${API_URL}/cars/carmakes`,
  carBodyTypes: `${API_URL}/cars/bodyType`,
  premiumCars: `${API_URL}/cars/premium-cars`,
  latestCars: `${API_URL}/cars/latest-cars`,
  allDealers: `${API_URL}/dealers`,
  createReview: `${API_URL}/reviews`,
  getCarById: `${API_URL}/cars`,
};
