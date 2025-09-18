"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("User", "hasWhatsapp", {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false, // Default to false if not specified
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("User", "hasWhatsapp");
  },
};
