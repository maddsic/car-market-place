"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.addColumn("Car", "drive", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "int_color", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "ext_color", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("Car", "vin", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "location", {
        type: Sequelize.STRING,
        allowNull: false,
      }),
      queryInterface.addColumn("Car", "lng", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "lat", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "air_condition", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "backup_camera", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "cruis_control", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "navigation", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "bluetooth", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "audio", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "stereo", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "dvd", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "airbag_passenger", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "airbag_driver", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "security_system", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "antilock", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "heated_seat", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "power_seat", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "bucket_seat", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "leather_seat", {
        type: Sequelize.BOOLEAN,
        allowNull: true,
      }),
      queryInterface.addColumn("Car", "seller_note", {
        type: Sequelize.STRING,
        allowNull: true,
      }),
    ]);
  },

  async down(queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.removeColumn("Car", "drive"),
      queryInterface.removeColumn("Car", "int_color"),
      queryInterface.removeColumn("Car", "vin"),
      queryInterface.removeColumn("Car", "location"),
      queryInterface.removeColumn("Car", "lng"),
      queryInterface.removeColumn("Car", "lat"),
      queryInterface.removeColumn("Car", "air_condition"),
      queryInterface.removeColumn("Car", "backup_camera"),
      queryInterface.removeColumn("Car", "cruis_control"),
      queryInterface.removeColumn("Car", "navigation"),
      queryInterface.removeColumn("Car", "bluetooth"),
      queryInterface.removeColumn("Car", "audio"),
      queryInterface.removeColumn("Car", "stereo"),
      queryInterface.removeColumn("Car", "dvd"),
      queryInterface.removeColumn("Car", "airbag_passenger"),
      queryInterface.removeColumn("Car", "airbag_driver"),
      queryInterface.removeColumn("Car", "security_system"),
      queryInterface.removeColumn("Car", "antilock"),
      queryInterface.removeColumn("Car", "heated_seat"),
      queryInterface.removeColumn("Car", "power_seat"),
      queryInterface.removeColumn("Car", "bucket_seat"),
      queryInterface.removeColumn("Car", "leather_seat"),
      queryInterface.removeColumn("Car", "seller_note"),
    ]);
  },
};
