"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   const CarBodyType = sequelize.define(
      "CarBodyType",
      {
         typeId: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true, allowNull: false },
         typeName: { type: DataTypes.STRING, allowNull: false },
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
            defaultValue: null,
         },
      },
      {
         freezeTableName: true,
         paranoid: true, 
         timestamps: true,
      }
   );

   CarBodyType.associate = models => {
      const { Car } = models;

      CarBodyType.hasMany(Car, {
         foreignKey: "carType",
         as: "cars",
      });
   };

   return CarBodyType;
};
