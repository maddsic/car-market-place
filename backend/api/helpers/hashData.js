const bcrypt = require("bcrypt");

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
