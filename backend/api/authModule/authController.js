const { findUser, createUser, sendResponse } = require("../helpers/response");
const {
  hashPassword,
  comparePassword,
  generateJwtToken,
} = require("../helpers/hashData");
const { registerSchema, loginSchema } = require("./authService");

/**
 * @typedef {object} UserRegistrationData
 * @property {string} first_name
 * @property {string} last_name
 * @property {string} email
 * @property {string} password
 * @property {string} phone
 * @property {string} address
 */

/**
 * Handles user registration.
 * Validates incoming data, checks for existing users, hashes passwords, and creates new user records.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @returns {Promise<void>}
 */

// Register route
exports.register = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);

  if (error) {
    return sendResponse(res, 400, false, error.details[0].message);
  }

  let { first_name, last_name, email, password, phone, address } = req.body;

  const formData = {
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    email: email.trim(),
    password: password.trim(),
    phone: phone.trim(),
    address: address.trim(),
  };

  try {
    //    Check if email exist
    const checkEmail = await findUser(email);

    //    IF Found
    if (checkEmail?.accept) {
      return sendResponse(res, 409, false, "Email already exist.");
    }

    //    Hash password
    const hashedPassword = await hashPassword(formData.password);
    formData.password = hashedPassword;

    //    Create a new user in our database
    const newUser = await createUser(formData);

    if (newUser?.accept) {
      return sendResponse(
        res,
        201,
        true,
        `User ${newUser.data.first_name} ${newUser.data.last_name} - created successfull`,
        newUser.data
      );
    } else {
      return sendResponse(res, newUser.status, false, "Cannot create user.");
    }
  } catch (error) {
    console.log("ERROR FROM AUTHCONTROLLER - REGISTER");
    console.log(error.message);
    next(error);
  }
};

/**
 * @typedef {object} UserLoginData
 * @property {string} email
 * @property {string} password
 */

/**
 * Handles user login.
 * Validates incoming data, finds user, compares password, and generates a JWT token upon successful authentication.
 *
 * @param {object} req - The Express request object.
 * @param {object} res - The Express response object.
 * @param {Function} next - The Express next middleware function.
 * @returns {Promise<void>}
 */
/** Login ROute */
exports.login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return sendResponse(res, 400, false, error.details[0].message);
  }

  const { email, password } = req.body;

  // Find user by email
  try {
    const user = await findUser(email);

    // Not found
    if (!user?.accept) {
      return sendResponse(res, 400, false, "Auth Fail");
    }

    // Compare password
    const validPassword = await comparePassword(password, user.data.password);

    if (!validPassword) {
      return sendResponse(res, 401, false, "Auth Fail");
    }

    // TODO - create a jwt token and assin user role, & ID
    const token = await generateJwtToken({
      userId: user.data.userId,
      email: user.data.email,
      role: user.data.role,
    });
    //  console.log(token);

    sendResponse(res, 200, true, "User logged in successfully!", token);
  } catch (error) {
    console.error("ERROR FROM AUTHCONTROLLER - LOGIN");
    console.error(error.message);
    next(error);
  }
};
