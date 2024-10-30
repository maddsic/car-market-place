const db = require("./api/models");

exports.authenticateDBConnection = async () => {
   try {
      await db.sequelize.authenticate();
      console.log("Database Connection has been established successfully");
      // return db.CarModel.findAll();
   } catch (error) {
      console.log("Unable to connect to database: " + err.message);
   }
};
