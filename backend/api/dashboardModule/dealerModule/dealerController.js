const { sendResponse, hasLength } = require('../../helpers/response');

// Controller layer handles incoming requests and responses, calls the service layer for business logic
class DealerController {
  constructor(dealerService) {
    this.dealerService = dealerService;
  }

  // GET DASHBOARD STATS FOR A DEALER - TOTAL LISTINGS, AVAILABLE LISTINGS, SOLD LISTINGS, REVIEW COUNT
  getDealerDashboardStats = async (req, res) => {
    try {
      const dealerId = req.user.userId;
      const stats = await this.dealerService.getDealerDashBoardStats(dealerId);
      return res.json(stats);
    } catch (error) {
      console.log('ERROR FROM GET DEALER DASHBOARD STATS API:', error);
      console.info('ERROR FROM GET DEALER DASHBOARD STATS API:', error);
      return res
        .status(500)
        .json({ error: 'Failed to fetch dealer dashboard stats' });
    }
  };

  // GET DEALER CARS FOR DASHBOARD
  getDealerCars = async (req, res) => {
    try {
      const dealerId = req.user?.userId;
      const cars = await this.dealerService.getDealerCars(dealerId);
      console.log('Cars');
      console.log(cars);
      return hasLength(cars)
        ? sendResponse(
          res,
          200,
          true,
          'Dealer cars retrieved successfully',
          cars
        )
        : sendResponse(res, 404, false, 'No Record Found');
    } catch (error) {
      console.error(
        'ERROR GETTING DEALER CARS FROM GetDealerCars Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };

  // GET RECENT ACTIVITEIS
  getRecentActivities = async (req, res) => {
    try {
      const userId = req.user?.userId;
      console.log('UserID', userId);
      const activities = await this.dealerService.getRecentActivities(userId);

      return sendResponse(res, 200, true, 'Record Found', activities);
    } catch (error) {
      console.error('Controller Error:', error);
      return sendResponse(res, 500, false, error.message);
    }
  };

  // GET DEALER PROFILE CARD DATA
  getDealerProfileCardData = async (req, res) => {
    try {
      const userId = req.user?.userId;
      const profileData = await this.dealerService.getDealerProfileCardData(userId);
      return sendResponse(res, 200, true, 'Record Found', profileData);
    } catch (error) {
      console.error('DEALER PROFILE CARD DATA Error:', error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // UPDATE DEALER PROFILE SETTINGS
  updateDealerProfile = async (req, res) => {

    try {
      const userId = req.user?.userId;
      const { first_name, last_name, address, phone } = req.body;

      const updateProfileData = {
        first_name,
        last_name,
        address,
        phone,
        avatarUrl: req.file ? req.file.filename : undefined
      }

      console.log("UPDATED PROFILE DATA BEFORE : ", updateProfileData)

      const updatedProfile = await this.dealerService.updateDealerProfile(userId, updateProfileData);

      console.log("UPDATED PROFILE DATA AFTER: ", updatedProfile)
      return sendResponse(res, 200, true, 'Profile updated successfully', updatedProfile);
    } catch (error) {
      console.error('UPDATE DEALER PROFILE Error:', error);
      return sendResponse(res, 500, false, error.message);
    }
  }
}

module.exports = DealerController;
