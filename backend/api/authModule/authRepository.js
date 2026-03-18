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
}

module.exports = AuthRepository;
