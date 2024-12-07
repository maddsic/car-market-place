"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   const CarMake = sequelize.define(
      "CarMake",
      {
         id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
         name: { type: DataTypes.STRING, allowNull: false },
         imageUrl: { type: DataTypes.STRING, allowNull: true },
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
      },
      {
         freezeTableName: true,
      }
   );

   CarMake.associate = models => {
      const { CarModel } = models;

      CarMake.hasMany(CarModel, {
         foreignKey: "make_id",
         onDelete: "SET NULL",
      });
   };

   return CarMake;
};
