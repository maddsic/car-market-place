const jwt = require("jwt");
const { sendResponse } = require("../helpers/response");

exports.VerifyOwner = async (req, res, next) => {
   try {
      const authHeader = req.headers.authorization;
      const token = authHeader.split(" ")[1];

      if (token === null) return sendResponse(res, 401, false, "No token found");

      jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
         if (err) return sendResponse(res, 403, false, "Authentication failed - invaliad or expired token");
         //  console.log("USER DATA FROM DECODED TOKEN");
         //  console.log(user);
         req.userData = user;

         if (req.userData.id !== req.params.id) return sendResponse(res, 403, false, "Authentication failed - invaliad or expired token");

         next();
      });
   } catch (error) {
      console.log("VERIFY OWNER", error.message);
      return sendResponse(res, 500, false, "Server error");
   }
};
