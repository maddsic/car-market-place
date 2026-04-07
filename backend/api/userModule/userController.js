const { sendResponse, hasLength } = require('../helpers/response');

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // Get all users with their cars and reviews
  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      if (hasLength(users)) {
        return sendResponse(res, 200, true, 'Result(s) found...', users);
      }
      return sendResponse(res, 404, false, 'No result found.', {});
    } catch (error) {
      console.log('ERROR FROM GET ALL USERS CONTROLLER: ' + error.message);
      next(error);
    }
  };

  // Get a specific user by ID with their cars and reviews
  getUserById = async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
      return sendResponse(res, 400, false, 'User ID is required', {});
    }
    try {
      const user = await this.userService.getUserById(userId);
      if (hasLength(user)) {
        return sendResponse(res, 200, true, 'Result(s) found...', user);
      }
      return sendResponse(res, 404, false, 'No result found.', {});
    } catch (error) {
      console.log('ERROR FROM GET SINGLE USER CONTROLLER: ' + error.message);

      if (error.message.includes('User ID')) {
        return sendResponse(res, 400, false, error.message, {});
      }
      next(error);
    }
  };

  // Update user information
  updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const updateData = req.body;

    if (!userId) {
      return sendResponse(res, 400, false, 'User ID is required', {});
    }

    try {
      const updatedUser = await this.userService.updateUser(userId, updateData);
      return updatedUser
        ? sendResponse(res, 200, true, 'User updated successfully', updatedUser)
        : sendResponse(
          res,
          404,
          false,
          'User not found or no changes made',
          {}
        );
    } catch (error) {
      console.log('ERROR FROM UPDATE USER CONTROLLER: ' + error.message);

      if (error.message.includes('User not found')) {
        return sendResponse(res, 404, false, error.message, {});
      }
      next(error);
    }
  };

  // Delete a user by ID
  deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
      return sendResponse(res, 400, false, 'User ID is required', {});
    }

    try {
      const deleted = await this.userService.deleteUser(userId);
      return deleted
        ? sendResponse(res, 200, true, 'User deleted successfully', {})
        : sendResponse(res, 404, false, 'User not found', {});
    } catch (error) {
      console.log('ERROR FROM DELETE USER CONTROLLER: ' + error.message);

      if (error.message.includes('User not found')) {
        return sendResponse(res, 404, false, error.message, {});
      }
      next(error);
    }
  };
}

module.exports = UserController;
