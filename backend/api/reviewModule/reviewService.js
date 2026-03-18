class ReviewService {
  constructor(reviewRepository) {
    this.reviewRepository = reviewRepository;
  }

  async createReview(userId, dealerId, body) {
    if (!userId) {
      throw new Error("Unauthorized: user not logged in");
    }

    const { buyingProcess, customerService, overallExperience, comment } =
      body;

    if (buyingProcess === undefined || customerService === undefined || overallExperience === undefined || !comment) {
      throw new Error("All fields are required");
    }
    return this.reviewRepository.createReview({
      userId,
      dealerId,
      buyingProcess,
      customerService,
      overallExperience,
      comment,
    })
  }

  async getReviewsByDealerId(dealerId) {
    if (!dealerId) {
      throw new Error("Review ID is required");
    }
    return this.reviewRepository.getReviewsByDealerId(dealerId);
  }
}

module.exports = ReviewService;
