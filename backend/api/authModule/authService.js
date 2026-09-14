const { comparePassword, generateJwtToken, hashPassword } = require('../helpers/hashData');
const crypto = require('crypto');
const EmailHelper = require('../helpers/emailHelper');

class AuthService {
  constructor(authRepository) {
    this.authRepository = authRepository;
  }

  // STEP 1: Process User Registration & Dispatch Verification Email
  async registerUser(data) {
    const existingUser = await this.authRepository.findUserByEmail(data.email);
    if (existingUser) {
      return { status: 409, message: 'User with this email already exists' };
    }

    const hashedPassword = await hashPassword(data.password);

    // Generate a secure verification token (64 hex characters)
    const verificationToken = crypto.randomBytes(32).toString('hex');

    // Set expiration (e.g., 24 hours from now)
    const verificationTokenExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    const userData = {
      ...data,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpires,
      isVerified: false
    };

    // Create the user in the database
    const newUser = await this.authRepository.createUser(userData);
    // Destructure to exclude sensitive fields from the response eg. password and verificationToken
    const { password, verificationToken: token, ...formData } = newUser.toJSON ? newUser.toJSON() : newUser;

    // Send the Welcome & Verification Email
    try {
      await EmailHelper.sendVerificationEmail(
        newUser.email,
        `${newUser.first_name} ${newUser.last_name}`,
        verificationToken
      );
    } catch (emailError) {
      console.error('Email sending failed during registration:', emailError.message);
      // Decide if failure to deliver email should log an error or fail registration
      return {
        status: 500,
        message: 'User created, but failed to send verification email. Please contact support.',
        data: formData,
        error: emailError.message
      };
    }

    return {
      status: 201,
      message: `User ${data.first_name} ${data.last_name} created successfully. Please check your email to verify your account.`,
      data: formData,
    };
  }


  // STEP 2: Process Email Verification Link Click
  async verifyUserEmail(token) {
    if (!token) {
      return { status: 400, message: 'Verification token is required.' };
    }

    const user = await this.authRepository.findUserByVerificationToken(token);
    if (!user) {
      return { status: 400, message: 'Invalid or expired verification token.' };
    }

    // Update user: mark account verified and clear verification token
    await this.authRepository.updateUser(user.id, {
      isVerified: true,
      verificationToken: null
    });

    return { status: 200, message: 'Email verified successfully. You can now log in.' };
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
  async sendPasswordResetCodeService(email) {
    try {
      const user = await this.authRepository.findUserByEmail(email);

      if (!user) {
        return { status: 200, message: "If this account exists, a verification code has been sent to your email." };
      }

      // 1. Generate cryptographically secure 6-digit code
      const code = crypto.randomInt(100000, 999999).toString();

      // 2. Hash code and update DB
      const hashedCode = await hashPassword(code);
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

      await this.authRepository.updateUserResetCode(email, hashedCode, expiresAt);

      // 3. Send email
      try {
        await EmailHelper.sendResetCode(email, code);
      } catch (emailError) {
        console.error("Resend Delivery Failed:", emailError.message);
        return { status: 500, message: "Failed to transmit recovery email code." };
      }

      return { status: 200, message: "If this account exists, a verification code has been sent to your email." };
    } catch (error) {
      console.error("Error in sendPasswordResetCode service:", error);
      return { status: 500, message: error.message || "Internal server error." };
    }
  }

  /**
   * STEP 2: Validate the code and update the password
   */
  async verifyAndResetPasswordService(email, code, newPassword) {
    try {
      const user = await this.authRepository.findUserByEmail(email);

      // 1. Check if user exists and has an active reset request
      if (!user || !user.resetCode || !user.resetCodeExpires) {
        return { status: 404, message: "Invalid or expired verification request." };
      }

      // 2. Check expiration timeline
      if (new Date() > new Date(user.resetCodeExpires)) {
        return { status: 400, message: "This recovery code has expired. Please request a new one." };
      }

      // 3. Compare the provided code with the hashed code in the database
      const isCodeValid = await comparePassword(code, user.resetCode);
      if (!isCodeValid) {
        return { status: 400, message: "The provided verification code is incorrect." };
      }

      // 4. Securely hash the fresh password string
      const securePassword = await hashPassword(newPassword);

      // 5. Update password and remove temporary tokens
      const isPasswordUpdated = await this.authRepository.updateUserPasswordAndClearResetCode(email, securePassword);

      if (!isPasswordUpdated) {
        return { status: 500, message: "Failed to update password. Please try again." };
      }

      // 6. Return consistent result object (Express controller will send the response)
      return { status: 200, message: "Password updated successfully!" };
    } catch (error) {
      console.error("Error in verifyAndResetPassword service:", error);
      return { status: 500, message: error.message || "An error occurred while resetting your password." };
    }
  }
}

module.exports = AuthService;
