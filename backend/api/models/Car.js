"use strict";

const Sequelize = require("sequelize");

module.exports = (sequelize, DataTypes) => {
   const Car = sequelize.define(
      "Car",
      {
         carId: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            allowNull: false,
            primaryKey: true,
         },
         userId: {
            type: Sequelize.UUID,
            allowNull: false,
            references: {
               model: "User", // table name
               key: "userId",
            },
            onDelete: "paranoid",
         },
         carType: { type: DataTypes.STRING, allowNull: false },
         make: { type: DataTypes.STRING, allowNull: false },
         model: { type: DataTypes.STRING, allowNull: false },
         year: { type: DataTypes.INTEGER, allowNull: false },
         price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
         mileage: { type: DataTypes.INTEGER, allowNull: false },
         color: { type: DataTypes.STRING, allowNull: false },
         fuelType: { type: DataTypes.ENUM("petrol", "gas"), allownull: false },
         description: { type: DataTypes.STRING, allowNull: true },
         imageUrl: { type: DataTypes.STRING, allowNull: false },
         engineType: { type: DataTypes.STRING, allowNull: false },
         isPremium: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
         status: { type: DataTypes.STRING, allowNull: true, defaultValue: "available" },
         transmission: { type: DataTypes.STRING, allowNull: false },
      },
      {
         freezeTableName: true,
         paranoid: true, // implement soft delete
      }
   );

   //    Associations
   Car.associate = function (models) {
      Car.belongsTo(models.User, {
         foreignKey: "userId",
         as: "owner",
         onDelete: "paranoid",
      });

      Car.belongsTo(models.CarBodyType, {
         foreignKey: "carType",
         as: "bodyType",
      });
   };

   return Car;
};
