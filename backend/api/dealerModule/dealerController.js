const { sendResponse, hasLength } = require("../helpers/response");

// Controller for handling dealer-related requests
class DealerController {
  constructor(dealerService) {
    this.dealerService = dealerService;
  }

  // Seeach dealers controllers and return dealer name, casrsCount, telephone number, location
  getDealers = async (req, res, next) => {
    try {
      const dealers = await this.dealerService.getDealers();
      if (hasLength(dealers)) {
        return sendResponse(res, 200, true, "Dealers found", dealers);
      }
      return sendResponse(res, 404, false, "No dealers found", {});
    } catch (error) {
      console.log("ERROR FROM GET DEALERS CLASS: " + error.message);
      next(error);
    }
  }

  // Search dealers based on filters and include the count of their cars
  searchDealers = async (req, res, next) => {
    try {
      const dealers = await this.dealerService.searchDealers(req.query);
      if (hasLength(dealers)) {
        return sendResponse(res, 200, true, "Result(s) found...", dealers);
      }
      return sendResponse(res, 404, false, "No result found.", {});
    } catch (error) {
      console.log("ERROR FROM SEARCH DEALER CAR CLASS: " + error.message);
      next(error);
    }
  }

  // Get a specific dealer by userId with their cars filtered by the provided criteria
  getDealerByIdWithFilteredCars = async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
      return sendResponse(res, 400, false, "User ID is required.", {});
    }

    try {
      const dealer = await this.dealerService.getDealerByIdWithFilteredCars(userId, req.query);

      if (dealer) {
        return sendResponse(res, 200, true, "Result(s) found...", dealer);
      }
      return sendResponse(res, 404, false, "No result found.", {});
    } catch (error) {
      console.log("ERROR FROM GET DEALER BY ID CAR CLASS: " + error.message);
      next(error);
    }
  }
}

module.exports = DealerController;







































