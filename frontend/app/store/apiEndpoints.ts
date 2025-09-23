const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const apiVersion = import.meta.env.VITE_API_VERSION || "/api/v1";

export const apiEndpoints = {
  carMakes: `${apiBaseUrl}${apiVersion}/cars/carmakes`,
  carBodyTypes: `${apiBaseUrl}${apiVersion}/cars/bodyType`,
  premiumCars: `${apiBaseUrl}${apiVersion}/cars/premium-cars`,
  latestCars: `${apiBaseUrl}${apiVersion}/cars/latest-cars`,
};
