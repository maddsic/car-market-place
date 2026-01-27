"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Car", "stockNumber", {
      type: Sequelize.STRING,
      allowNull: true,
      unique: true,
    });

    // Populate stockNumber for existing records
    const [cars] = await queryInterface.sequelize.query(
      "SELECT carId, make, year FROM Car"
    );

    console.log("Found cars:", cars.length); // <== ADD THIS

    // Generate and set stockNumber for each existing car in the database
    for (const car of cars) {
      if (!car.carId) continue;

      const makeCarSlug = car.make?.substring(0, 3).toUpperCase() || "UNK";
      const randomStkNumber = Math.floor(1000 + Math.random() * 9000);
      const stockNumber = `${makeCarSlug}${car.year}-${randomStkNumber}`;

      // Update each car with the generated stockNumber
      await queryInterface.sequelize.query(
        `UPDATE Car SET stockNumber = :stockNumber WHERE carId = :carId`,
        {
          replacements: { stockNumber, carId: car.carId },
        }
      );
      console.log(`Updated ${car.make} (${car.year}) → ${stockNumber}`);
    }

    // Make stockNumber non-nullable after populating existing records
    await queryInterface.changeColumn("Car", "stockNumber", {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Car", "stockNumber");
  },
};
