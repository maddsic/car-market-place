const { sendResponse } = require('../helpers/response');
const { registerSchema, loginSchema, resetPasswordSchema } = require('./validations');

//
const isDevelopment = process.env.NODE_ENV === 'development';

class AuthController {
  constructor(authService) {
    this.authService = authService;
  }

  // Register route
  register = async (req, res, next) => {
    const { error } = registerSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, false, error.details[0].message);
    }

    try {
      const response = await this.authService.registerUser(req.body);
      return sendResponse(
        res,
        response.status,
        response.status < 400,
        response.message,
        response.data
      );
    } catch (error) {
      console.error('REGISTER ERROR:', error.message);
      next(error);
    }
  };

  // Login route
  login = async (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error) return sendResponse(res, 400, false, error.details[0].message);

    try {
      const result = await this.authService.loginUser(
        req.body.email,
        req.body.password
      );

      if (result.status !== 200)
        return sendResponse(res, result.status, false, result.message);

      res.cookie('authToken', result.token, {
        httpOnly: true,
        secure: !isDevelopment,
        sameSite: isDevelopment ? 'lax' : 'none',
        path: '/',
        maxAge: 60 * 60 * 1000,
      });

      return sendResponse(res, 200, true, 'User logged in successfully!');
    } catch (error) {
      console.error('LOGIN ERROR:', error.message);
      next(error);
    }
  };

  // Controller for requesting the code (Step 1)
  requestResetCode = async (req, res, next) => {
    const { email } = req.body;
    if (!email) return sendResponse(res, 400, false, "Email address is required.");

    try {
      const result = await this.authService.sendPasswordResetCode(email);
      return sendResponse(res, result.status, result.status === 200, result.message);
    } catch (error) {
      console.error('RESET CODE REQ ERROR:', error.message);
      next(error);
    }
  };

  // Controller for final verification and reset (Step 2)
  resetPassword = async (req, res, next) => {
    const { error } = resetPasswordSchema.validate(req.body);
    if (error) {
      return sendResponse(res, 400, false, error.details[0].message);
    }

    // If validation passes, you safely pass just the password to your service!
    try {
      const { email, code, password } = req.body;
      const result = await this.authService.verifyAndResetPassword(email, code, password);
      return sendResponse(res, result.status, result.status === 200, result.message);
    } catch (error) {
      console.error('PASSWORD RESET SUBMIT ERROR:', error.message);
      next(error);
    }
  };
}

module.exports = AuthController;
