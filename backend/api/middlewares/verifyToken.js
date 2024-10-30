const jwt = require("jsonwebtoken");
const { sendResponse } = require("../helpers/response");

exports.checkAuth = async (req, res, next) => {
   try {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];
      // console.log("token");
      // console.log(token);

      if (token === null) return sendResponse(res, 401, false, "No token found");

      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
         if (err) return sendResponse(res, 403, false, "Authentication failed - invalid or expired token");
         // console.log("USER DATA FROM DECODED TOKEN");
         // console.log(user);

         req.userData = user;
         next();
      });
   } catch (error) {
      console.log("CHECK AUTH", error.message);
      return sendResponse(res, 500, false, "Server error");
   }
};
