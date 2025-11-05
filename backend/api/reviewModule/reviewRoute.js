const express = require("express");
const router = express.Router();
const { createReview } = require("./reviewController");
const { checkAuth } = require("../middlewares/verifyToken");

// CREATE REVIEW for a dealer
router.post("/:dealerId", checkAuth, createReview);

module.exports = router;
