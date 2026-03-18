const { User, Car, Review } = require("../models");

class UserRepository {

  // Get all users with their associated cars and reviews
  async getAllUsers() {
    return User.findAll({
      include: { model: Car, as: "cars" },
    });
  }

  // Get a specific user by ID with their cars and reviews
  async getUserById(userId) {
    return User.findOne({
      where: { userId },
      include: [
        { model: Car, as: "cars" },
        { model: Review, as: "dealerReviews", include: [{ model: User, as: "user", attributes: ["username"] }] }
      ]
    })
  }

  // Update user information
  async updateUser(userId, updateData) {
    const [affectedRows] = await User.update(updateData, { where: { userId } });
    if (affectedRows > 0) {
      return this.getUserById(userId);
    }
    throw new Error("User not found or no changes made");
  }

  // Delete a user by ID
  async deleteUser(userId) {
    return User.destroy({ where: { userId } });
  }
}


module.exports = UserRepository;
