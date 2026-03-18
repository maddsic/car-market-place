const { comparePassword, generateJwtToken, } = require("../helpers/hashData");
class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  async registerUser(data) {
    const existingUser = await this.authRepository.findUserByEmail(userData.email);
    if (existingUser) {
      return { status: 409, message: "User with this email already exists" };
    }
    const hashedPassword = await hashedPassword(data.password);
    data.password = hashedPassword;

    const newUser = await this.authRepository.createUser(data);
    const { password, ...userData } = newUser.toJSON();

    return {
      status: 201,
      message: `User ${userData.first_name} ${userData.last_name} created successfully`,
      data: userData,
    }
  }

  async loginUser(email, password) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      return { status: 404, message: "Auth Fail" };
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return { status: 400, message: "Auth Fail" };
    }

    const token = generateJwtToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
    });

    return { status: 200, message: "Login successful", token };
  }
}

module.exports = AuthService;
