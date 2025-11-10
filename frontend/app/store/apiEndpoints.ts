const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
const apiVersion = import.meta.env.VITE_API_VERSION || "/api/v1";

export const apiEndpoints = {
  login: `${apiBaseUrl}${apiVersion}/auth/login`,
  register: `${apiBaseUrl}${apiVersion}/auth/register`,
  carMakes: `${apiBaseUrl}${apiVersion}/cars/carmakes`,
  carBodyTypes: `${apiBaseUrl}${apiVersion}/cars/bodyType`,
  premiumCars: `${apiBaseUrl}${apiVersion}/cars/premium-cars`,
  latestCars: `${apiBaseUrl}${apiVersion}/cars/latest-cars`,
  allDealers: `${apiBaseUrl}${apiVersion}/dealers`,
  createReview: `${apiBaseUrl}${apiVersion}/reviews`,
};
