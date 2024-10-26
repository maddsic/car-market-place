const { Car } = require("../models");
const path = require("path");
const { carSchema } = require("./carService");
const { sendResponse, hasLength, hasError, convertImageToBase64 } = require("../helpers/response");

const CarBodyType = require("../models/").CarBodyType;
const CarMake = require("../models/").CarMake;
const CarModel = require("../models/").CarModel;

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

      if (hasLength(cars)) {
         const carImages = await Promise.all(
            // Map through all cars and convert to base64
            cars.map(async car => {
               const imgPath = path.join(__dirname, "../../image_uploads", car.imageUrl);
               // console.log(`Processing image for car ID ${car.id}: ${imgPath}`);

               const base64Image = await convertImageToBase64(imgPath);

               return {
                  ...car.toJSON(),
                  imageUrl: base64Image ? `data:image/jpeg;base64,${base64Image}` : null,
               };
            })
         );
         return sendResponse(res, 200, true, "Car(s) Found", carImages);
      }
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
      // console.log("Get car by Id");

      return hasLength(car) ? sendResponse(res, 200, true, "Car Found", car) : sendResponse(res, 404, false, "Car not found");
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

      if (hasLength(numberOfAffectedRows)) {
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

      return hasLength(affectedRows) ? sendResponse(res, 200, true, "Car deleted successfully", {}) : sendResponse(res, 200, false, "Car delete fail", {});
   } catch (error) {
      console.log("ERROR FROM USER CONTROLLER: " + error.message);
      next(error);
   }
};

exports.getCarMakes = async (req, res, next) => {
   try {
      const carMakes = await CarMake.findAll({ include: { model: CarModel } });

      return hasLength(carMakes) ? sendResponse(res, 200, true, "Result(s) found...", carMakes) : sendResponse(res, 404, false, "No result found.", {});
   } catch (error) {
      console.log("ERROR FROM GET CAR MAKES CONTROLLER: " + error.message);
      next(error);
   }
};

exports.getCarModel = async (req, res, next) => {
   const { make_id } = req.body;
   try {
      const carModels = await CarModel.findAll({ where: { make_id } });

      return hasLength(carModels) ? sendResponse(res, 200, true, "Result(s) found...", carModels) : sendResponse(res, 404, false, "No result found.", {});
   } catch (error) {
      console.log("ERROR FROM GET CAR MODELS CONTROLLER: " + error.message);
      next(error);
   }
};

exports.getCarBodyTypes = async (req, res, next) => {
   try {
      const bodyType = await CarBodyType.findAll();

      return hasLength(bodyType) ? sendResponse(res, 200, true, "Result(s) found...", bodyType) : sendResponse(res, 404, false, "No result found.", {});
   } catch (error) {
      console.log("ERROR FROM GET CAR BODY TYPES CONTROLLER: " + error.message);
      next(error);
   }
};
