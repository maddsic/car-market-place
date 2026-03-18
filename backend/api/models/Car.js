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
          model: "User",
          key: "userId",
        },
        onDelete: "RESTRICT",
      },
      stockNumber: { type: DataTypes.STRING, allowNull: true, unique: true },
      carType: { type: DataTypes.STRING, allowNull: false },
      condition: {
        type: DataTypes.ENUM("certified_used", "new", "used"),
        allowNull: true,
      },
      make: { type: DataTypes.STRING, allowNull: false },
      model: { type: DataTypes.STRING, allowNull: false },
      year: { type: DataTypes.INTEGER, allowNull: false },
      price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
      mileage: { type: DataTypes.INTEGER, allowNull: false },
      fuelType: { type: DataTypes.STRING, allowNull: false },
      imageUrl: { type: DataTypes.STRING, allowNull: false },
      engineType: { type: DataTypes.STRING, allowNull: false },
      transmission: { type: DataTypes.STRING, allowNull: false },

      // --- NEW FIELDS FROM MIGRATION ---
      drive: { type: DataTypes.STRING, allowNull: true },
      int_color: { type: DataTypes.STRING, allowNull: true },
      ext_color: { type: DataTypes.STRING, allowNull: false },
      vin: { type: DataTypes.STRING, allowNull: true },
      location: { type: DataTypes.STRING, allowNull: false },
      lng: { type: DataTypes.STRING, allowNull: true },
      lat: { type: DataTypes.STRING, allowNull: true },
      seller_note: { type: DataTypes.TEXT, allowNull: true },

      // --- FEATURE CHECKBOXES (BOOLEANS) ---
      air_condition: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      backup_camera: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      cruis_control: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      navigation: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      bluetooth: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      audio: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      stereo: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      dvd: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      airbag_passenger: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      airbag_driver: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      security_system: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      antilock: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      heated_seat: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      power_seat: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      bucket_seat: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },
      leather_seat: { type: DataTypes.BOOLEAN, allowNull: true, defaultValue: false },

      isPremium: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
        defaultValue: false,
      },
      status: {
        type: DataTypes.ENUM("available", "sold", "inactive"),
        allowNull: false,
        defaultValue: "available",
      },
    },
    {
      freezeTableName: true,
      paranoid: true,
    }
  );

  Car.associate = function (models) {
    Car.belongsTo(models.User, { foreignKey: "userId", as: "owner", onDelete: "CASCADE" });
    Car.belongsTo(models.CarBodyType, { foreignKey: "carType", targetKey: "typeName", as: "bodyType" });
    Car.hasMany(models.CarImage, { foreignKey: "carId", as: "images", onDelete: "CASCADE" });
  };

  Car.beforeCreate((car) => {
    const makeSlug = car.make?.substring(0, 3).toUpperCase() || "UNK";
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    car.stockNumber = `${makeSlug}${car.year}-${randomNumber}`;
  });

  return Car;
};
