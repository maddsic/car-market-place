"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Fetch IDs using MySQL compatible syntax
    const [models] = await queryInterface.sequelize.query(
      "SELECT id FROM CarModel;"
    );

    if (models.length === 0) {
      console.log("No models found in CarModel table.");
      return;
    }

    const yearsToInsert = [];
    const startYear = 2010;
    const endYear = 2026;

    models.forEach((model) => {
      for (let year = startYear; year <= endYear; year++) {
        yearsToInsert.push({
          id: uuidv4(),
          year: year,
          model_id: model.id,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    // 2. Chunking for MySQL performance
    const chunkSize = 1000;
    for (let i = 0; i < yearsToInsert.length; i += chunkSize) {
      const chunk = yearsToInsert.slice(i, i + chunkSize);
      await queryInterface.bulkInsert("CarModelYear", chunk);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("CarModelYear", null, {});
  }
};
