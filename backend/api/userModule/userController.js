const { sendResponse } = require("../helpers/response");
const User = require("../models").User;
const Car = require("../models").Car;

/** Get all users controller @route get / */
exports.getUsers = async (req, res, next) => {
   try {
      const users = await User.findAll({
         include: { model: Car, as: "cars" },
      });

      return users.length > 0
         ? res.status(200).json({ success: true, message: "Users Found", data: users })
         : res.status(200).json({ success: false, message: "No User(s) Found", data: [] });
   } catch (error) {
      console.log("ERROR FROM GET ALL USERS CONTROLLER: " + error.message);
      next(error);
   }
};

/** Get user By iD controller @route get /:userId */
exports.getUserById = async (req, res, next) => {
   const { userId } = req.params;

   try {
      const user = await User.findOne({
         where: { userId },
         include: { model: Car, as: "cars" },
      });

      return !user ? sendResponse(res, 404, false, "No User(s) Found", {}) : sendResponse(res, 200, true, "User(s) Found", user);
   } catch (error) {
      console.log("ERROR FROM GET SINGLE USER CONTROLLER: " + error.message);
      next(error);
   }
};

/** Update user controller @route put /:userId */
exports.updateUser = async (req, res, next) => {
   const { userId } = req.params;
   const updateForm = req.body;

   try {
      const [numberOfAffectedRows] = await User.update(updateForm, {
         where: { userId },
      });

      if (numberOfAffectedRows > 0) {
         const updatedUser = await User.findOne({ where: { userId } });

         return sendResponse(res, 200, true, "User updated successfully", updatedUser);
      }
      return sendResponse(res, 409, false, "User update fail");
   } catch (error) {
      console.log("ERROR FROM USER CONTROLLER: " + error.message);
      next(error);
   }
};

/** Delete user controller @route delete /:userId */
exports.deleteUser = async (req, res, next) => {
   const { userId } = req.params;

   try {
      const affectedRows = await User.destroy({ where: { userId } });
      console.log("AFFECTED ROWS");
      console.log(affectedRows);

      return affectedRows > 0 ? sendResponse(res, 200, true, "User deleted successfully", {}) : sendResponse(res, 200, false, "User delete fail", {});
   } catch (error) {
      console.log("ERROR FROM USER CONTROLLER: " + error.message);
      next(error);
   }
};
