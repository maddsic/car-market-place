const { sendResponse } = require("../helpers/response");

// Controller for handling review-related operations
class ReviewController {
  constructor(reviewService) {
    this.reviewService = reviewService;
  }

  // create a new review
  createReview = async (req, res, next) => {
    try {
      const userId = req.user && req.user.userId; // reviewer (must be logged in)
      const { dealerId } = req.params; // dealer being reviewed

      const newReview = await this.reviewService.createReview(
        userId,
        dealerId,
        req.body
      );
      // console.log(newReview)
      return sendResponse(
        res,
        201,
        true,
        "Review created successfully",
        newReview
      );
    } catch (error) {
      console.error("ERROR FROM CREATE REVIEW CONTROLLER:", error.message);

      if (error.message.includes("Unauthorized")) {
        return sendResponse(res, 401, false, error.message);
      }
      if (error.message.includes("required")) {
        return sendResponse(res, 400, false, error.message);
      }
      next(error);
    }
  }

  // get reviews for a specific dealer, limit to 5 most recent reviews
  getReviewsById = async (req, res, next) => {
    const { dealerId } = req.params;

    if (!dealerId) {
      return sendResponse(res, 400, false, "Review ID is required");
    }

    try {
      const reviews = await this.reviewService.getReviewsByDealerId(dealerId);
      if (!reviews || reviews.length === 0) {
        return sendResponse(res, 404, false, "User has No review(s) yet");
      }
      return sendResponse(res, 200, true, "Review(s) found", reviews);
    } catch (error) {
      console.log("ERROR FROM GET REVIEW BY ID CONTROLLER: " + error.message);

      if (error.message.includes("dealer ID")) {
        return sendResponse(res, 400, false, error.message);
      }
      next(error);
    }
  }
}

module.exports = ReviewController;





















