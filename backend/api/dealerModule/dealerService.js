const { processCarImages } = require('../helpers/processCarImage');

// Service for handling business logic related to dealers
class DealerService {
  constructor(dealerRepository) {
    this.dealerRepository = dealerRepository;
  }
  // Helper method to extract search filters from the query parameters
  searchFilters({ query = {} }) {
    const { condition, make, model } = query;
    const filters = {};

    if (condition && condition.trim() !== "") filters.condition = condition.trim();
    if (make && make.trim() !== "") filters.make = make.trim();
    if (model && model.trim() !== "") filters.model = model.trim();

    return filters;
  }

  // Get all dealers with the count of their cars
  async getDealers() {
    return this.dealerRepository.getAllDealersWithCarCount();
  }

  // Search dealers based on filters and include the count of their cars
  async searchDealers(query) {
    const filters = this.searchFilters(query);
    return this.dealerRepository.searchDealersWithFilters(filters);
  }

  // Get a specific dealer by userId with their cars filtered by the provided criteria
  async getDealerByIdWithFilteredCars(userId, query) {
    const filters = this.searchFilters(query);

    const dealer = await this.dealerRepository.getDealerWithFilteredCars(
      userId,
      filters
    );

    if (!dealer) return null;

    const data = dealer.toJSON();
    data.cars = await processCarImages(data.cars);

    return data;
  }
}

module.exports = DealerService;
