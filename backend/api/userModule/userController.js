const { processCarImages } = require("../helpers/processCarImage");
const { sendResponse, hasLength } = require("../helpers/response");
// const User = require("../models").User;
// const Car = require("../models").Car;
// const Review = require("../models").Review;

// /** Get all users controller @route get / */
// exports.getUsers = async (req, res, next) => {
//   try {
//     const users = await User.findAll({
//       include: { model: Car, as: "cars" },
//     });

//     return users.length > 0
//       ? res
//         .status(200)
//         .json({ success: true, message: "Users Found", data: users })
//       : res
//         .status(200)
//         .json({ success: false, message: "No User(s) Found", data: [] });
//   } catch (error) {
//     console.log("ERROR FROM GET ALL USERS CONTROLLER: " + error.message);
//     next(error);
//   }
// };

// /** Get user By iD controller @route get /:userId */
// exports.getUserById = async (req, res, next) => {
//   const { userId } = req.params;
//   console.log("userID", userId);

//   try {
//     const user = await User.findOne({
//       where: { userId },
//       include: [
//         {
//           model: Car,
//           as: "cars",
//         },
//         {
//           model: Review,
//           as: "dealerReviews",
//           include: [{ model: User, as: "user", attributes: ["username"] }],
//         },
//       ],
//     });

//     if (hasLength(user)) {
//       const userCars = await processCarImages(user.cars);

//       const dataWithBase64 = {
//         ...user.toJSON(),
//         cars: userCars,
//       };

//       return sendResponse(res, 200, true, "Record(s) Found", dataWithBase64);
//     }

//     return sendResponse(res, 404, false, "No Record Found");
//   } catch (error) {
//     console.log("ERROR FROM GET SINGLE USER CONTROLLER: " + error.message);
//     next(error);
//   }
// };

// /** Update user controller @route put /:userId */
// exports.updateUser = async (req, res, next) => {
//   const { userId } = req.params;
//   const updateForm = req.body;

//   try {
//     const [numberOfAffectedRows] = await User.update(updateForm, {
//       where: { userId },
//     });

//     if (numberOfAffectedRows > 0) {
//       const updatedUser = await User.findOne({ where: { userId } });

//       return sendResponse(
//         res,
//         200,
//         true,
//         "User updated successfully",
//         updatedUser
//       );
//     }
//     return sendResponse(res, 409, false, "User update fail");
//   } catch (error) {
//     console.log("ERROR FROM USER CONTROLLER: " + error.message);
//     next(error);
//   }
// };

// /** Delete user controller @route delete /:userId */
// exports.deleteUser = async (req, res, next) => {
//   const { userId } = req.params;

//   try {
//     const affectedRows = await User.destroy({ where: { userId } });
//     console.log("AFFECTED ROWS");
//     console.log(affectedRows);

//     return affectedRows > 0
//       ? sendResponse(res, 200, true, "User deleted successfully", {})
//       : sendResponse(res, 200, false, "User delete fail", {});
//   } catch (error) {
//     console.log("ERROR FROM USER CONTROLLER: " + error.message);
//     next(error);
//   }
// };

class UserController {
  constructor(userService) {
    this.userService = userService;
  }

  // Get all users with their cars and reviews
  getAllUsers = async (req, res, next) => {
    try {
      const users = await this.userService.getAllUsers();
      if (hasLength(users)) {
        return sendResponse(res, 200, true, "Result(s) found...", users);
      }
      return sendResponse(res, 404, false, "No result found.", {});
    } catch (error) {
      console.log("ERROR FROM GET ALL USERS CONTROLLER: " + error.message);
      next(error);
    }
  }

  // Get a specific user by ID with their cars and reviews
  getUserById = async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
      return sendResponse(res, 400, false, "User ID is required", {});
    }
    try {
      const user = await this.userService.getUserById(userId);
      if (hasLength(user)) {
        return sendResponse(res, 200, true, "Result(s) found...", user);
      }
      return sendResponse(res, 404, false, "No result found.", {});
    } catch (error) {
      console.log("ERROR FROM GET SINGLE USER CONTROLLER: " + error.message);

      if (error.message.includes("User ID")) {
        return sendResponse(res, 400, false, error.message, {});
      }
      next(error);
    }
  }

  // Update user information
  updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const updateData = req.body;

    if (!userId) {
      return sendResponse(res, 400, false, "User ID is required", {});
    }

    try {
      const updatedUser = await this.userService.updateUser(userId, updateData);
      return updatedUser ? sendResponse(res, 200, true, "User updated successfully", updatedUser) : sendResponse(res, 404, false, "User not found or no changes made", {});
    } catch (error) {
      console.log("ERROR FROM UPDATE USER CONTROLLER: " + error.message);

      if (error.message.includes("User not found")) {
        return sendResponse(res, 404, false, error.message, {});
      }
      next(error);
    }
  }

  // Delete a user by ID
  deleteUser = async (req, res, next) => {
    const { userId } = req.params;

    if (!userId) {
      return sendResponse(res, 400, false, "User ID is required", {});
    }

    try {
      const deleted = await this.userService.deleteUser(userId);
      return deleted ? sendResponse(res, 200, true, "User deleted successfully", {}) : sendResponse(res, 404, false, "User not found", {});
    } catch (error) {
      console.log("ERROR FROM DELETE USER CONTROLLER: " + error.message);

      if (error.message.includes("User not found")) {
        return sendResponse(res, 404, false, error.message, {});
      }
      next(error);
    }
  }
}

module.exports = UserController;







































