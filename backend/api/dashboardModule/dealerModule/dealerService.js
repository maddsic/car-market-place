const { processCarImages } = require("../../helpers/processCarImage");
// Service layer contains business logic and interacts with the repository
class DealerService {
  constructor(dealerRepository) {
    this.dealerRepo = dealerRepository;
  }

  //
  async getDealerDashBoardStats(dealerId) {
    const carStatistics = await this.dealerRepo.getDealerCarStats(dealerId);
    const reviewCount = await this.dealerRepo.getDealerCarReviewCount(dealerId);

    return {
      dealerId,
      totalListings: Number(carStatistics.totalListings),
      availableListings: Number(carStatistics.availableListings),
      soldListings: Number(carStatistics.soldListings),
      reviewCount
    }
  }

  // 14. GET DEALER CARS
  async getDealerCars(dealerId) {
    const cars = await this.dealerRepo.findDealerCars(dealerId);
    return processCarImages(cars);
  }

  // Get recent activities
  async getRecentActivities(userId) {
    return await this.dealerRepo.findActivityByUserId(userId);
  }
}

module.exports = DealerService;
