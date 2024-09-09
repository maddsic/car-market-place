const { Car } = require("../models");
const { carSchema } = require("./carService");
const { sendResponse } = require("../helpers/response");
const CarBodyType = require("../models/").CarBodyType;

exports.createCar = async (req, res, next) => {
   const { error } = carSchema.validate(req.body);

   if (error) {
      return sendResponse(res, 400, false, error.details[0].message);
   }

   const { userId, make, model, year, price, mileage, color, fuelType, description, engineType, carType } = req.body;

   const imageUrl = req.file.filename;

   const carBodyType = await CarBodyType.findOne({ where: { typeName: carType } });

   if (!carBodyType) {
      return sendResponse(res, 400, false, "Car body type not found");
   }

   const form = {
      userId,
      make,
      model,
      year,
      price,
      mileage,
      color,
      fuelType,
      description,
      imageUrl: imageUrl,
      engineType,
      carTypeId: carBodyType.typeId,
   };

   try {
      const newCar = await Car.create(form);

      return newCar ? sendResponse(res, 201, true, "Car created successfully", newCar) : sendResponse(res, 404, false, "Create Fail");
   } catch (error) {
      console.log("ERROR FROM CREATE CAR CONTROLLER: " + error.message);
      next(error);
   }
};

exports.getCars = async (req, res, next) => {
   try {
      const cars = await Car.findAll({ include: { model: CarBodyType, as: "bodyType" } });

      return cars.length > 0 ? sendResponse(res, 200, true, "Car(s) Found", cars) : sendResponse(res, 404, false, "Car(s) not found");
   } catch (error) {
      console.log("ERROR FROM GET ALL cars CONTROLLER: " + error.message);
      next(error);
   }
};

exports.getCarById = async (req, res, next) => {
   const { carId } = req.params;

   try {
      const car = await Car.findOne({
         where: { carId },
         include: { model: CarBodyType, as: "bodyType" },
      });
      console.log(car);

      return car ? sendResponse(res, 200, true, "Car(s) Found", car) : sendResponse(res, 404, false, "Car(s) not found");
   } catch (error) {
      console.log("ERROR FROM GET ALL cars CONTROLLER: " + error.message);
      next(error);
   }
};

exports.updateCar = async (req, res, next) => {
   const { carId } = req.params;
   const updateForm = req.body;

   try {
      const [numberOfAffectedRows] = await Car.update(updateForm, {
         where: { carId },
      });

      if (numberOfAffectedRows > 0) {
         const updatedCar = await Car.findOne({ where: { carId } });

         return sendResponse(res, 200, true, "Car updated successfully", updatedCar);
      }
      return sendResponse(res, 409, false, "Car update fail");
   } catch (error) {
      console.log("ERROR FROM CAR CONTROLLER - update: " + error.message);
      next(error);
   }
};

exports.deleteCar = async (req, res, next) => {
   const { carId } = req.params;

   try {
      const affectedRows = await Car.destroy({ where: { carId } });
      console.log("AFFECTED ROWS");
      console.log(affectedRows);

      return affectedRows > 0 ? sendResponse(res, 200, true, "Car deleted successfully", {}) : sendResponse(res, 200, false, "Car delete fail", {});
   } catch (error) {
      console.log("ERROR FROM USER CONTROLLER: " + error.message);
      next(error);
   }
};
