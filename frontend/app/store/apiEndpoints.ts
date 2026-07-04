import { apiBaseUrl, apiVersion, apiUrl } from "~/config/api";

export { apiBaseUrl, apiVersion, apiUrl };

export const apiEndpoints = {
  login: apiUrl("/auth/login"),
  register: apiUrl("/auth/register"),
  createCar: apiUrl("/cars"),
  updateCar: apiUrl("/cars/update"),
  carMakes: apiUrl("/cars/carmakes"),
  carModels: apiUrl("/cars/carmodels"),
  carBodyTypes: apiUrl("/cars/bodyType"),
  premiumCars: apiUrl("/cars/premium-cars"),
  latestCars: apiUrl("/cars/latest-cars"),
  searchCars: apiUrl("/cars/search"),
  allDealers: apiUrl("/dealers"),
  searchDealers: apiUrl("/dealers/search-dealers"),
  createReview: apiUrl("/reviews"),
  getCarById: apiUrl("/cars"),
  dealerStats: apiUrl("/dealer-dashboard/stats"),
  dealerInventory: apiUrl("/dealer-dashboard/inventory"),
  dealerActivities: apiUrl("/dealer-dashboard/activities"),
  dealerProfileCard: apiUrl("/dealer-dashboard/profile-card"),
  dealerProfileUpdate: apiUrl("/dealer-dashboard/profile-update"),
};
