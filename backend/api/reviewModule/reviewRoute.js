const express = require("express");
const router = express.Router();
const { checkAuth } = require("../middlewares/verifyToken");

const ReviewRepository = require("./reviewRepository");
const ReviewService = require("./reviewService");
const ReviewController = require("./reviewController");


const reviewRepository = new ReviewRepository();
const reviewService = new ReviewService(reviewRepository);
const reviewController = new ReviewController(reviewService);

// CREATE REVIEW for a dealer
router.get("/:dealerId", reviewController.getReviewsById);
router.post("/:dealerId", checkAuth, reviewController.createReview);
module.exports = router;
