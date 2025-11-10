const { findUser, createUser, sendResponse } = require("../helpers/response");
const {
  hashPassword,
  comparePassword,
  generateJwtToken,
} = require("../helpers/hashData");
const { registerSchema, loginSchema } = require("./authService");
const isProduction = process.env.NODE_ENV === "production";

// Register route
exports.register = async (req, res, next) => {
  const { error } = registerSchema.validate(req.body);
  if (error) {
    return sendResponse(res, 400, false, error.details[0].message);
  }

  let {
    first_name,
    last_name,
    email,
    password,
    phone,
    username,
    role,
    hasWhatsapp,
  } = req.body;

  const formData = {
    first_name: first_name.trim(),
    last_name: last_name.trim(),
    email: email.trim(),
    password: password.trim(),
    phone: phone.trim(),
    username: username.trim(),
    role,
    hasWhatsapp,
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
      const { password, ...userData } = newUser.data;
      return sendResponse(
        res,
        201,
        true,
        `User ${userData.first_name} ${userData.last_name} - created successfull`,
        userData
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

/** Login ROute */
exports.login = async (req, res, next) => {
  const { error } = loginSchema.validate(req.body);

  if (error) {
    return sendResponse(res, 400, false, error.details[0].message);
  }

  const { email, password } = req.body;

  try {
    const user = await findUser(email);
    if (!user?.accept) {
      return sendResponse(res, 400, false, "Auth Fail");
    }

    const validPassword = await comparePassword(password, user.data.password);
    if (!validPassword) {
      return sendResponse(res, 401, false, "Auth Fail");
    }

    // Create JWT token
    const token = generateJwtToken({
      userId: user.data.userId,
      email: user.data.email,
      role: user.data.role,
    });

    // ✅ Configure cookie for both localhost & production
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: isProduction, // true on Vercel, false on localhost
      sameSite: isProduction ? "none" : "lax", // None for cross-site HTTPS, Lax for local dev
      path: "/",
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    console.info("Login Cookie:", res.getHeader("Set-Cookie"));

    // Send success response (without token in body for security)
    sendResponse(res, 200, true, "User logged in successfully!");
  } catch (err) {
    console.error("ERROR FROM AUTHCONTROLLER - LOGIN");
    console.error(err.message);
    next(err);
  }
};
