const { sendResponse } = require("../helpers/response");
const { registerSchema, loginSchema } = require("./validations");

//
const isDevelopment = process.env.NODE_ENV === "development";

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
      return sendResponse(res, response.status, response.status < 400, response.message, response.data);
    } catch (error) {
      console.error("REGISTER ERROR:", err.message);
      next(err);
    }
  }

  // Login route
  login = async (req, res, next) => {
    const { error } = loginSchema.validate(req.body);
    if (error)
      return sendResponse(res, 400, false, error.details[0].message);

    try {
      const result = await this.authService.loginUser(req.body.email, req.body.password);

      if (result.status !== 200)
        return sendResponse(res, result.status, false, result.message);

      res.cookie("authToken", result.token, {
        httpOnly: true,
        secure: !isDevelopment,
        sameSite: isDevelopment ? "lax" : "none",
        path: "/",
        maxAge: 60 * 60 * 1000,
      });

      return sendResponse(res, 200, true, "User logged in successfully!");
    } catch (err) {
      console.error("LOGIN ERROR:", err.message);
      next(err);
    }
  };
}

module.exports = AuthController;




















// Register route
// exports.register = async (req, res, next) => {
//   const { error } = registerSchema.validate(req.body);
//   if (error) {
//     return sendResponse(res, 400, false, error.details[0].message);
//   }

//   let {
//     first_name,
//     last_name,
//     email,
//     password,
//     phone,
//     username,
//     role,
//     hasWhatsapp,
//   } = req.body;

//   const formData = {
//     first_name: first_name.trim(),
//     last_name: last_name.trim(),
//     email: email.trim(),
//     password: password.trim(),
//     phone: phone.trim(),
//     username: username.trim(),
//     role,
//     hasWhatsapp,
//   };

//   try {
//     //    Check if email exist
//     const checkEmail = await findUser(email);
//     if (checkEmail?.accept) {
//       return sendResponse(res, 409, false, "Email already exist.");
//     }
//     //    Hash password
//     const hashedPassword = await hashPassword(formData.password);
//     formData.password = hashedPassword;
//     //    Create a new user in our database
//     const newUser = await createUser(formData);
//     if (newUser?.accept) {
//       const { password, ...userData } = newUser.data;
//       return sendResponse(
//         res,
//         201,
//         true,
//         `User ${userData.first_name} ${userData.last_name} - created successfull`,
//         userData
//       );
//     } else {
//       return sendResponse(res, newUser.status, false, "Cannot create user.");
//     }
//   } catch (error) {
//     console.log("ERROR FROM AUTHCONTROLLER - REGISTER");
//     console.log(error.message);
//     next(error);
//   }
// };

/** Login ROute */
// exports.login = async (req, res, next) => {
//   const { error } = loginSchema.validate(req.body);

//   if (error) {
//     return sendResponse(res, 400, false, error.details[0].message);
//   }

//   const { email, password } = req.body;

//   try {
//     const user = await findUser(email);
//     if (!user?.accept) {
//       return sendResponse(res, 400, false, "Auth Fail");
//     }

//     const validPassword = await comparePassword(password, user.data.password);
//     if (!validPassword) {
//       return sendResponse(res, 401, false, "Auth Fail");
//     }

//     // Create JWT token
//     const token = generateJwtToken({
//       userId: user.data.userId,
//       email: user.data.email,
//       role: user.data.role,
//     });

//     // ✅ Configure cookie for both localhost & production
//     res.cookie("authToken", token, {
//       httpOnly: true,
//       secure: !isDevelopment, // true on Vercel, false on localhost
//       sameSite: isDevelopment ? "lax" : "none", // None for cross-site HTTPS, Lax for local dev
//       path: "/",
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     console.info("Login Cookie:", res.getHeader("Set-Cookie"));

//     // Send success response (without token in body for security)
//     sendResponse(res, 200, true, "User logged in successfully!");
//   } catch (err) {
//     console.error("ERROR FROM AUTHCONTROLLER - LOGIN");
//     console.error(err.message);
//     next(err);
//   }
// };
