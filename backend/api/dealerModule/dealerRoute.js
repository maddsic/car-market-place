const express = require("express");
const router = express.Router();
const {
  searchDealers,
  getDealers,
  getDealerFilteredCarParams,
} = require("./dealerController");

// SEARCH DEALERS
router.get("/filtered-cars/:userId", getDealerFilteredCarParams);
router.get("/", getDealers);
router.get("/search-dealers", searchDealers);

module.exports = router;
