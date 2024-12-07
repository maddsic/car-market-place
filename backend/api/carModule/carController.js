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

   const { userId, make, model, year, price, mileage, color, fuelType, description, engineType, transmission, carType } = req.body;

   const imageUrl = req.file ? req.file.filename : null;

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
      transmission,
      carTypeId: carBodyType.typeId,
      carType,
   };

   try {
      const newCar = await Car.create(form);

      return newCar ? sendResponse(res, 201, true, "Car created successfully", newCar) : sendResponse(res, 404, false, "Create Fail");
   } catch (error) {
      console.log("ERROR FROM CREATE CAR CONTROLLER: " + error.message);
      next(error);
   }
};

// GET ALL CARS BASE ON SECTION AND VALUE
exports.getCars = async (req, res, next) => {
   const { section, value } = req.query;

   try {
      let cars;
      switch (section) {
         case "inventory":
            // Fetch all cars
            cars = await Car.findAll();
            break;
         case "make":
            // Fetch cars by make ID
            cars = await Car.findAll({ where: { make: value } });
            break;
         case "premium":
            // Fetch premium cars based on some premium condition
            cars = await Car.findAll({ where: { isPremium: true } });
            break;
         case "latest":
            // Fetch the latest cars
            cars = await Car.findAll({ order: [["createdAt", "DESC"]] });
            break;
         case "category":
            cars = await Car.findAll({ where: { carType: value} });
            
            break;
         default: 
            cars = await Car.findAll();
            break;
      }

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
      return sendResponse(res, 404, false, "No Record Found");
   } catch (error) {
      console.log("ERROR FROM GET ALL cars CONTROLLER: " + error.message);
      next(error);
   }
};

// PREMIUM CARS
exports.getPremiumCars = async (req, res, next) => {
   const premiumCars = await Car.findAll({ where: { isPremium: true }, limit: 3 });

   if (hasLength(premiumCars)) {
      const premiumCarImages = await Promise.all(
         // Map through all cars and convert to base64
         premiumCars.map(async car => {
            const imgPath = path.join(__dirname, "../../image_uploads", car.imageUrl);
            // console.log(`Processing image for car ID ${car.id}: ${imgPath}`);

            const base64Image = await convertImageToBase64(imgPath);

            return {
               ...car.toJSON(),
               imageUrl: base64Image ? `data:image/jpg;base64,${base64Image}` : null,
            };
         })
      );
      return sendResponse(res, 200, true, "Car(s) Found", premiumCarImages);
   }
   return sendResponse(res, 404, false, "No Record Found");
};

//  LATEST CARS
exports.getLatestCars = async (req, res, next) => {
   const latestCars = await Car.findAll({ order: [["createdAt", "DESC"]], limit: 8 });
   console.log(latestCars.length);

   if (hasLength(latestCars)) {
      const latestCarImages = await Promise.all(
         // Map through all cars and convert to base64
         latestCars.map(async car => {
            const imgPath = path.join(__dirname, "../../image_uploads", car.imageUrl);
            // console.log(`Processing image for car ID ${car.id}: ${imgPath}`);

            const base64Image = await convertImageToBase64(imgPath);

            return {
               ...car.toJSON(),
               imageUrl: base64Image ? `data:image/jpg;base64,${base64Image}` : null,
            };
         })
      );
      return sendResponse(res, 200, true, "Car(s) Found", latestCarImages);
   }
   return sendResponse(res, 404, false, "No Record Found");
};

exports.getCarById = async (req, res, next) => {
   const { carId } = req.params;

   try {
      const carData = await Car.findOne({
         where: { carId },
         include: { model: CarBodyType, as: "bodyType" },
      });

      if (hasLength(carData)) {
         const imgPath = path.join(__dirname, "../../image_uploads", carData.imageUrl);

         const base64Image = await convertImageToBase64(imgPath);

         const finalData = {
            ...carData.toJSON(),
            imageUrl: base64Image ? `data:image/jpg;base64,${base64Image}` : null,
         };

         return sendResponse(res, 200, true, "Record Found", finalData);
      }
      return sendResponse(res, 404, false, "No Record Found");
   } catch (error) {
      console.log("ERROR FROM GET ALL premiumCars CONTROLLER: " + error.message);
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

exports.createCarMakes = async (req, res, next) => {
   const { name } = req.body;
   // console.log("MAKES");
   // console.log(name);

   const imageUrl = req.file ? req.file.filename : null;
   console.log("imageUrl", + imageUrl)

   const data = {
      name,
      imageUrl: imageUrl,
   };

   try {
      const new_make = await CarMake.create(data);
      console.log(new_make);

      return new_make ? sendResponse(res, 201, true, "Car make created successfully", new_make) : sendResponse(res, 404, false, "Cannot create car makes");
   } catch (error) {
      console.log("ERROR FROM CREATE CAR MAKES: " + error.message);
      next(error);
   }
};

exports.getCarMakes = async (req, res, next) => {
   try {
      const carMakes = await CarMake.findAll({ include: { model: CarModel } });
      // console.log("first car makes: " + carMakes);

      if (hasLength(carMakes)) {
         const carMakeImages = await Promise.all(
            carMakes.map(async make => {
               const imgPath = path.join(__dirname, "../../image_uploads", make.imageUrl);

               const base64Image = await convertImageToBase64(imgPath);

               return {
                  ...make.toJSON(),
                  imageUrl: base64Image ? `data:image/png;base64,${base64Image}` : null,
               };
            })
         );
         return sendResponse(res, 200, true, "Record Found", carMakeImages);
      }
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
