const { comparePassword, generateJwtToken, hashPassword } = require('../helpers/hashData');
const EmailHelper = require('../helpers/emailHelper');

class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  // REGISTER USER
  async registerUser(data) {
    const existingUser = await this.authRepository.findUserByEmail(
      data.email
    );
    if (existingUser) {
      return { status: 409, message: 'User with this email already exists' };
    }
    const hashedPassword = await hashPassword(data.password);
    data.password = hashedPassword;

    const newUser = await this.authRepository.createUser(data);
    const { password, ...formData } = newUser.toJSON();

    return {
      status: 201,
      message: `User ${data.first_name} ${data.last_name} created successfully`,
      data: data,
    };
  }

  // LOGIN USER
  async loginUser(email, password) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      return { status: 404, message: 'Auth Fail' };
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
      return { status: 400, message: 'Auth Fail' };
    }

    const token = generateJwtToken({
      userId: user.userId,
      email: user.email,
      role: user.role,
    });

    return { status: 200, message: 'Login successful', token };
  }

  /**
   * STEP 1: Process requesting a reset code
   */
  async sendPasswordResetCode(email) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      return { status: 444, message: "If this account exists, a verification code has been sent to your email." };
    }

    // Generate a random 6-digit code string (e.g., "482910")
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Set expiration to 15 minutes from right now
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Save to DB
    await this.authRepository.updateUserResetCode(email, code, expiresAt);

    // Send it asynchronously straight to Mailpit local inbox!
    try {
      await EmailHelper.sendResetCode(email, code);
    } catch (emailError) {
      console.error("Mailpit Delivery Failed:", emailError.message);
      return { status: 500, message: "Failed to transmit recovery email code." };
    }

    return { status: 200, message: "Verification code sent to your email!" };
  }

  /**
   * STEP 2: Validate the code and update the password
   */
  async verifyAndResetPassword(email, code, newPassword) {
    const user = await this.authRepository.findUserByEmail(email);
    if (!user) {
      return { status: 404, message: "User identity validation failed." };
    }

    // 1. Verify code exists and matches exactly
    if (!user.resetCode || user.resetCode !== code) {
      return { status: 400, message: "Please enter a valid verification code." };
    }

    // 2. Verify code timeline hasn't expired
    if (new Date() > new Date(user.resetCodeExpires)) {
      return { status: 400, message: "This recovery code has expired. Please request a new one." };
    }

    // 3. Securely hash the fresh password string
    const securePassword = await hashPassword(newPassword);

    // 4. Update password and remove temporary tokens
    await this.authRepository.updateUserPassword(email, securePassword);

    return { status: 200, message: "Password updated successfully!" };
  }
}

module.exports = AuthService;
