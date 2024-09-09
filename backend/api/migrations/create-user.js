"use strict";
module.exports = {
   up: async (queryInterface, Sequelize) => {
      await queryInterface.createTable("User", {
         userId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
         },
         first_name: { type: Sequelize.STRING, allownull: false },
         last_name: { type: Sequelize.STRING, allownull: false },
         email: { type: Sequelize.STRING, allownull: false, unique: true },
         password: { type: Sequelize.STRING, allownull: false },
         phone: { type: Sequelize.STRING, allownull: false },
         address: { type: Sequelize.STRING, allownull: false },
         isVerified: {
            type: Sequelize.BOOLEAN,
            allownull: false,
            defaultValue: false,
         },
         role: { type: Sequelize.ENUM("admin", "agent", "user"), allownull: false, defaultValue: "user" },

         createdAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("now"),
         },
         updatedAt: {
            allowNull: false,
            type: Sequelize.DATE,
            defaultValue: Sequelize.fn("now"),
         },
         deletedAt: {
            type: Sequelize.DATE,
            allowNull: true,
         },
      });
   },
   down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable("User");
   },
};
