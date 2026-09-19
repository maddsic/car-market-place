const { User } = require('../models');

class AuthRepository {
  constructor(models) {
    this.User = models.User;
  }

  // Find a user by their email address
  async findUserByEmail(email) {
    return this.User.findOne({ where: { email } });
  }

  // Create a new user in the database
  async createUser(userData) {
    return this.User.create(userData);
  }

  // Find a user by their verification token and ensure the token hasn't expired
  async findUserByVerificationToken(token) {
    const user = await User.findOne({
      where: { verificationToken: token },
    });

    return user;
  };

  // Update the user's verification status
  async updateUser(userId, updateData) {
    const [affectedCount] = await User.update(updateData, {
      where: { userId }
    });

    return affectedCount > 0;
  }


  // Update the user's password
  async updateUserResetCode(email, code, expiresAt) {
    return this.User.update(
      { resetCode: code, resetCodeExpires: expiresAt },
      { where: { email } }
    )
  }

  // Update the user's password and clear the reset code and its expiration
  async updateUserPasswordAndClearResetCode(email, newHashedPassword) {
    const [affectedRows] = await User.update(
      {
        password: newHashedPassword,
        resetCode: null,
        resetCodeExpires: null
      },
      { where: { email } }
    )
    return affectedRows > 0;
  }
}

module.exports = AuthRepository;
