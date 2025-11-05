"use strict";

module.exports = (sequelize, DataTypes) => {
  const Car = sequelize.define(
    "Car",
    {
      carId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "User", // table name
          key: "userId",
        },
        onDelete: "RESTRICT",
      },
      stockNumber: { type: DataTypes.STRING, allowNull: true, unique: true },
      carType: { type: DataTypes.STRING, allowNull: false },
      make: { type: DataTypes.STRING, allowNull: false },
      model: { type: DataTypes.STRING, allowNull: false },
      year: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      mileage: { type: DataTypes.INTEGER, allowNull: false },
      fuelType: { type: DataTypes.STRING, allownull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      engineType: { type: DataTypes.STRING, allowNull: false },
      isPremium: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      transmission: { type: DataTypes.STRING, allowNull: false },
    },
    {
      freezeTableName: true,
      paranoid: true,
    }
  );

  //    Associations
  Car.associate = function (models) {
    Car.belongsTo(models.User, {
      foreignKey: "userId",
      as: "owner",
      onDelete: "CASCADE",
    });

    Car.belongsTo(models.CarBodyType, {
      foreignKey: "carType",
      as: "bodyType",
    });
  };

  // Generate stockNumber before creating a Car
  Car.beforeCreate((car) => {
    const makeSlug = car.make?.substring(0, 3).toUpperCase() || "UNK";
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    car.stockNumber = `${makeSlug}${car.year}-${randomNumber}`;
  });

  return Car;
};
