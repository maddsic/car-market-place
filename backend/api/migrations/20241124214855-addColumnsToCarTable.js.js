"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.addColumn("Car", "transmission", {
         type: Sequelize.STRING,
         allownull: false,
      });
      await queryInterface.addColumn("Car", "status", {
         type: Sequelize.STRING,
         allownull: false,
         defaultValue: "available",
      });
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.removeColumn("Car", "transmission");
      await queryInterface.removeColumn("Car", "status");
   },
};
