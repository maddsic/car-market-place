const { processCarImages } = require('../../helpers/processCarImage');
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
      reviewCount,
    };
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

  async getDealerProfileCardData(userId) {
    const user = await this.dealerRepo.getDealerProfileCardData(userId);
    // console.log("User review count", user)
    if (!user) {
      throw new Error('User not found');
    }

    const joinedDate = new Date(user.createdAt).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

    return {
      fullName: `${user.first_name} ${user.last_name}`,
      first_name: user.first_name,
      last_name: user.last_name,
      username: user.username,
      email: user.email,
      phone: user.phone,
      address: user.address,
      avatarUrl: user.avatarUrl,
      verified: user.verified || true,
      joined: joinedDate,
      location: user.address || 'Location not provided',
      rating: 132,
      reviewCount: user.reviewCount || 0,
    }
  }

  async updateDealerProfile(userId, updateData) {
    // 1. Tell the repository to update the profile
    await this.dealerRepo.updateDealerProfile(userId, updateData);

    // 2. Fetch the fresh data to send back to the frontend.
    return await this.dealerRepo.findById(userId);
  }
}

module.exports = DealerService;
