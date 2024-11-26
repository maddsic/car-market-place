"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addColumn("Car", "carType", {
         type: Sequelize.UUID, // Assuming typeId is a UUID
         allowNull: true,
         references: {
            model: "CarBodyType", // Name of the referenced table
            key: "typeId", // Key in the referenced table
         },
         onUpdate: "CASCADE",
         onDelete: "SET NULL",
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn("Car", "carType");
   },
};
