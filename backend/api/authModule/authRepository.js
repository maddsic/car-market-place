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

  // save the fresh password and wipe out the used reset tokens
  async updateUserPassword(email, hashedPassword) {
    return this.User.update(
      { password: hashedPassword, resetCode: null, resetCodeExpires: null },
      { where: { email } }
    );
  }
}

module.exports = AuthRepository;
