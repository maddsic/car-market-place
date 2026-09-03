const { User } = require('../../models');

class AuthRepository {
  constructor(models) {
    this.User = models.User;
  }

  async findUserByEmail(email) {
    return this.User.findOne({ where: { email } });
  }
  async createUser(userData) {
    return this.User.create(userData);
  }

  // Update the user's password
  async updateUserResetCode(email, code, expiresAt) {
    return this.User.update(
      { resetCode: code, resetCodeExpires: expiresAt },
      { where: { email } }
    )
  }


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
