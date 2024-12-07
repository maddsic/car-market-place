"use strict";

module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("CarModel", {
         id: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
         },
         name: {
            type: Sequelize.STRING,
            allowNull: false,
            // unique: true
         },
         make_id: {
            type: Sequelize.UUID,
            allowNull: false,
            // unique: true,
         },
         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("NOW"),
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("NOW"),
         },
         deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
            defaultValue: null
         },
      });
   },

   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("CarModel", null, {});
   },
};
