const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.hashPassword = async (data, salt = 10) => {
   try {
      const hashedPassword = await bcrypt.hash(data, salt);
      return hashedPassword;
   } catch (error) {
      throw error;
   }
};

exports.comparePassword = async (data, password) => {
   try {
      const result = await bcrypt.compare(data, password);

      return result;
   } catch (error) {
      throw error;
   }
};

exports.generateJwtToken = ({ userId, email, role }) => {
   return jwt.sign({ userId, email, role }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
   });
};
