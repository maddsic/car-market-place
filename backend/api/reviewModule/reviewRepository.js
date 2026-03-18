const { Review } = require("../models");

class ReviewRepository {

  // create a new review
  async createReview(data) {
    return Review.create(data);
  }

  // get reviews for a specific dealer, limit to 5 most recent reviews
  async getReviewsByDealerId(dealerId) {
    return Review.findAll({ where: { dealerId }, limit: 20, });
  }
}

module.exports = ReviewRepository;
