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
      return { status: 200, message: "If this account exists, a verification code has been sent to your email." };
    }

    // 1. Generate cryptographically secure 6-digit code
    const code = crypto.randomInt(100000, 999999).toString();

    // 2. Hash the code before storing it in the database for security
    const hashedCode = await hashPassword(code);


    // Set expiration to 15 minutes from right now
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

    // Save to DB
    await this.authRepository.updateUserResetCode(email, hashedCode, expiresAt);

    // Send it asynchronously straight to Mailpit local inbox!
    try {
      await EmailHelper.sendResetCode(email, code);
    } catch (emailError) {
      console.error("Mailpit Delivery Failed:", emailError.message);
      return { status: 500, message: "Failed to transmit recovery email code." };
    }

    return { status: 200, message: "If this account exists, a verification code has been sent to your email." };
  }

  /**
   * STEP 2: Validate the code and update the password
   */
  async verifyAndResetPassword(email, code, newPassword) {
    const user = await this.authRepository.findUserByEmail(email);

    // 1. Check if user exists and has an active reset request
    if (!user || !user.resetCode || !user.resetCodeExpires) {
      return { status: 404, message: "Invalid or expired verification request." };
    }

    // 2. Check expiration timeline
    if (new Date() > new Date(user.resetCodeExpires)) {
      return { status: 400, message: "This recovery code has expired. Please request a new one." };
    }

    //  3. Compare the provided code with the hashed code in the database
    const isCodeValid = await comparePassword(code, user.resetCode);
    if (!isCodeValid) {
      return { status: 400, message: "The provided verification code is incorrect." };
    }

    // 3. Securely hash the fresh password string
    const securePassword = await hashPassword(newPassword);

    // 4. Update password and remove temporary tokens
    const isPasswordUpdated = await this.authRepository.updateUserPasswordAndClearResetCode(email, securePassword);

    // 5. Return appropriate response based on update result
    return { status: 200, message: "Password updated successfully!" };
  }
}

module.exports = AuthService;
