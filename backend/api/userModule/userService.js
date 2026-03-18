const { processCarImages } = require("../helpers/processCarImage");

class UserService {
  constructor(userRepository) {
    this.userRepository = userRepository;
  }

  // Get all users with their cars and reviews
  async getAllUsers() {
    return this.userRepository.getAllUsers();
  }

  // Get a specific user by ID with their cars and reviews
  async getUserById(userId) {
    const user = await this.userRepository.getUserById(userId);

    if (!user) {
      throw new Error("User ID is required");
    }
    const userCars = await processCarImages(user.cars)
    return { ...user.toJSON(), cars: userCars };
  }

  // Update user information
  async updateUser(userId, updateData) {
    return this.userRepository.updateUser(userId, updateData);
  }

  // Delete a user by ID
  async deleteUser(userId) {
    return this.userRepository.deleteUser(userId);
  }
}

module.exports = UserService;
