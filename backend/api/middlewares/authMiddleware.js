const jwt = require('jsonwebtoken');
const { sendResponse } = require('../helpers/response');

const { Car } = require('../models');

class AuthMiddleware {
  /**
     * General Authentication: Checks if the user is logged in.
     * Use this for profile data, settings, and basic dashboard access.
     */
  static checkAuth(req, res, next) {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return sendResponse(res, 401, false, 'Unauthorized: No token provided');
    }
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;
      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return sendResponse(res, 403, false, 'Authentication failed: Invalid or expired token');
    }
  }

  /**
   * Role-Specific Authorization: Checks if the user is an Agent.
   * Use this for adding listings, managing inventory, or sales data.
   */
  static isAgent(req, res, next) {
    // First, ensure the user is authenticated
    AuthMiddleware.checkAuth(req, res, () => {
      // Then check if the user's role is 'agent'
      if (req.user.role !== 'agent') {
        return sendResponse(res, 403, false, 'Forbidden: Access is denied');
      }
      next();
    });
  }

  /**
   * Future-Proofing: Admin check
   */
  static isAdmin(req, res, next) {
    AuthMiddleware.checkAuth(req, res, () => {
      if (req.user.role !== 'admin') {
        return sendResponse(res, 403, false, 'Forbidden: Admins only');
      }
    })
  }

  static verifyOwnership(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      sendResponse(res, 401, false, 'Unauthorized: No token provided');
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = decoded;

      const userIdFromToken = req.user.userId;
      const userIdFromParams = req.params.userId || req.body.userId;

      if (userIdFromToken !== userIdFromParams) {
        return sendResponse(res, 403, false, 'Forbidden: You do not have permission to access this resource');
      }

      next();
    } catch (error) {
      console.error("JWT Verification Error:", error.message);
      return sendResponse(res, 403, false, 'Authentication failed: Invalid or expired token');
    }

  }

  static verifyCarOwnership = async (req, res, next) => {
    try {
      // UserID is already populatded in req.user by the checkAuth middleware, so we can directly use it here
      const userIdFromToken = req.user.userId;
      const carId = req.params.carId;

      const car = await Car.findOne({ where: { carId } });
      if (!car) {
        return sendResponse(res, 404, false, 'Car not found');
      }
      if (car.userId !== userIdFromToken) {
        return sendResponse(res, 403, false, 'Forbidden: You do not have permission to access this resource');
      }
      req.car = car; // Attach the car to the request for further use in the controller
      next();
    } catch (error) {
      console.error("Error verifying car ownership:", error);
      return sendResponse(res, 500, false, 'Internal Server Error');
    }
  }
}

module.exports = AuthMiddleware;
