const express = require("express");
const { checkAuth } = require("../middlewares/verifyToken");
const { getDealerDashboardStats } = require("./dealerStats");
const router = express.Router();


// SEARCH DEALERS
router.get("/stats", checkAuth, getDealerDashboardStats);

module.exports = router;
