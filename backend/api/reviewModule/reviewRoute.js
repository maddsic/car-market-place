const express = require("express");
const router = express.Router();
const { createReview, getReviewsById } = require("./reviewController");
const { checkAuth } = require("../middlewares/verifyToken");

// CREATE REVIEW for a dealer
router.get("/:dealerId", getReviewsById);
router.post("/:dealerId", checkAuth, createReview);

module.exports = router;
