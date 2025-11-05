// api/reviewModule/reviewController.js
const Review = require("../models").Review;
const { sendResponse } = require("../helpers/response");

exports.createReview = async (req, res, next) => {
  try {
    const userId = req.user && req.user.userId; // reviewer (must be logged in)
    const { dealerId } = req.params; // dealer being reviewed

    if (!userId) {
      return sendResponse(res, 401, false, "Unauthorized: user not logged in");
    }

    const { buyingProcess, customerService, overallExperience, comment } =
      req.body;

    if (!buyingProcess || !customerService || !overallExperience || !comment) {
      return sendResponse(res, 400, false, "All fields are required");
    }

    const newReview = await Review.create({
      userId,
      dealerId,
      buyingProcess,
      customerService,
      overallExperience,
      comment,
    });

    return sendResponse(
      res,
      201,
      true,
      "Review created successfully",
      newReview
    );
  } catch (error) {
    console.error("ERROR FROM CREATE REVIEW CONTROLLER:", error.message);
    next(error);
  }
};
