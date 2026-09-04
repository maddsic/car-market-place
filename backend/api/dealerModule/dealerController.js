const { sendResponse, hasLength } = require('../helpers/response');

// CONTROLLER FOR HANDLING DEALER REQUEST FOR THE SEARCH DEALER ROUTE
class DealerController {
  constructor(dealerService) {
    this.dealerService = dealerService;
  }

  // Seeach dealers controllers and return dealer name, casrsCount, telephone number, location
  getAllDealersWithCarCount = async (req, res, next) => {
    try {
      // Only flag as active if at least one parameter contains non-empty text
      const hasActiveFilters = Object.values(req.query).some(
        (val) => typeof val === 'string' && val.trim() !== ''
      );

      const dealers = hasActiveFilters
        ? await this.dealerService.searchDealersWithFilters(req.query)
        : await this.dealerService.getAllDealersWithCarCount();

      return sendResponse(res, 200, true, 'Result(s) found...', dealers || []);
    } catch (error) {
      console.log('ERROR FROM GET ALL DEALERS: ' + error.message);
      next(error);
    }
  };

  // Search dealers based on filters and include the count of their cars
  // searchDealersWithFilters = async (req, res, next) => {
  //   try {
  //     const dealers = await this.dealerService.searchDealersWithFilters(req.query);
  //     return sendResponse(res, 200, true, 'Result(s) found...', dealers || []);
  //   } catch (error) {
  //     console.log('ERROR FROM SEARCH DEALER CAR CLASS: ' + error.message);
  //     next(error);
  //   }
  // };

  // Get a specific dealer by userId with their cars filtered by the provided criteria
  getDealerByIdWithFilteredCars = async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
      return sendResponse(res, 400, false, 'User ID is required.', {});
    }

    try {
      const dealer = await this.dealerService.getDealerByIdWithFilteredCars(
        userId,
        req.query
      );

      if (dealer) {
        return sendResponse(res, 200, true, 'Result(s) found...', dealer || []);
      }
    } catch (error) {
      console.log('ERROR FROM GET DEALER BY ID CAR CLASS: ' + error.message);
      next(error);
    }
  };
}

module.exports = DealerController;
