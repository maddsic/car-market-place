const path = require("path");
const fs = require("fs").promises;

// SCHEMAS & HELPERS
const { carSchema } = require("./carService");
const { sendResponse, hasLength } = require("../helpers/response");
const { processCarImages } = require("../helpers/processCarImage");

// MODELS
// const Car = require("../models").Car;
// const User = require("../models").User;
// const CarBodyType = require("../models/").CarBodyType;
// const CarMake = require("../models/").CarMake;
// const CarModel = require("../models/").CarModel;
const {
  CarImage,
  CarModel,
  CarMake,
  CarBodyType,
  User,
  Car,
} = require("../models");
// console.log(typeof CarImage);
exports.createCar = async (req, res, next) => {
  // VALIDATE INCOMING FORM
  const { error } = carSchema.validate(req.body);

  if (error) return sendResponse(res, 400, false, error.details[0].message);

  // Get the user id form the middleware.
  const userId = req.user && req.user.userId;

  // CHECK IF BODY EXIST
  const carBodyType = await CarBodyType.findOne({
    where: { typeName: req.body.carType },
  });

  if (!carBodyType) {
    return sendResponse(res, 400, false, "Car body type not found");
  }

  // PREPARING OUR FORM
  const form = {
    ...req.body,
    userId: userId,
    imageUrl: req?.files[0]?.filename || "",
    year: "2023",
    carTypeId: carBodyType.typeId,
  };

  try {
    const newCar = await Car.create(form);

    const images = req.files.map((image, index) => ({
      carId: newCar.carId,
      imageUrl: image.filename,
      isPrimary: index == 0,
    }));

    await CarImage.bulkCreate(images);

    return newCar
      ? sendResponse(res, 201, true, "Car created successfully", newCar)
      : sendResponse(res, 404, false, "Create Fail");
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
        cars = await Car.findAll({
          include: [
            {
              model: User,
              as: "owner",
              attributes: ["first_name", "last_name", "phone"],
            },
          ],
          order: [["createdAt", "DESC"]],
        });
        console.log("latest car with user data in it");
        break;
      case "category":
        cars = await Car.findAll({ where: { carType: value } });
        break;
      default:
        cars = await Car.findAll();
        break;
    }

    if (hasLength(cars)) {
      const carImages = await processCarImages(cars);
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
  try {
    const premiumCars = await Car.findAll({
      where: { isPremium: true },
      limit: 3,
    });

    if (hasLength(premiumCars)) {
      const premiumCarImages = await processCarImages(premiumCars);
      return sendResponse(res, 200, true, "Car(s) Found", premiumCarImages);
    }
    return sendResponse(res, 404, false, "No Record Found");
  } catch (error) {
    console.log("ERROR FROM GET PREMIUM CARS CONTROLLER: " + error.message);
    next(error);
  }
};

//  LATEST CARS
exports.getLatestCars = async (req, res, next) => {
  const latestCars = await Car.findAll({
    include: [
      {
        model: User,
        as: "owner",
        attributes: ["first_name", "last_name", "phone", "role"],
      },
    ],
    order: [["createdAt", "DESC"]],
    limit: 8,
  });
  // console.log(latestCars.length);

  if (hasLength(latestCars)) {
    const latestCarImages = await processCarImages(latestCars);

    return sendResponse(res, 200, true, "Car(s) Found", latestCarImages);
  }
  return sendResponse(res, 404, false, "No Record Found");
};

// GET CAR BY ID
exports.getCarById = async (req, res, next) => {
  const { carId } = req.params;

  try {
    const carData = await Car.findOne({
      where: { carId },
      include: { model: User, as: "owner" },
    });

    if (hasLength(carData)) {
      const imgPath = path.join(
        __dirname,
        "../../image_uploads",
        carData.imageUrl
      );
      const imgBuffer = await fs.readFile(imgPath);

      const base64Image = imgBuffer.toString("base64");

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

// UPDATE CAR BY ID
exports.updateCar = async (req, res, next) => {
  const { carId } = req.params;
  const updateForm = req.body;

  // TODO: VALIDATE INCOMING DATA

  try {
    const [numberOfAffectedRows] = await Car.update(updateForm, {
      where: { carId },
    });

    if (hasLength(numberOfAffectedRows)) {
      const updatedCar = await Car.findOne({ where: { carId } });

      return sendResponse(
        res,
        200,
        true,
        "Car updated successfully",
        updatedCar
      );
    }
    return sendResponse(res, 409, false, "Car update fail");
  } catch (error) {
    console.log("ERROR FROM CAR CONTROLLER - update: " + error.message);
    next(error);
  }
};

// DELETE CAR BY ID
exports.deleteCar = async (req, res, next) => {
  const { carId } = req.params;

  try {
    const affectedRows = await Car.destroy({ where: { carId } });
    console.log("AFFECTED ROWS");
    console.log(affectedRows);

    return hasLength(affectedRows)
      ? sendResponse(res, 200, true, "Car deleted successfully", {})
      : sendResponse(res, 200, false, "Car delete fail", {});
  } catch (error) {
    console.log("ERROR FROM USER CONTROLLER: " + error.message);
    next(error);
  }
};

// CREATE CAR MAKES
exports.createCarMakes = async (req, res, next) => {
  const { name } = req.body;
  // console.log("MAKES");
  // console.log(name);

  const imageUrl = req.file ? req.file.filename : null;
  console.log("imageUrl", imageUrl);

  const data = {
    name,
    imageUrl: imageUrl,
  };

  try {
    const new_make = await CarMake.create(data);
    // console.log(new_make);

    return new_make
      ? sendResponse(res, 201, true, "Car make created successfully", new_make)
      : sendResponse(res, 404, false, "Cannot create car makes");
  } catch (error) {
    console.log("ERROR FROM CREATE CAR MAKES: " + error.message);
    next(error);
  }
};

// GET CAR MAKES
exports.getCarMakes = async (req, res, next) => {
  try {
    const carMakes = await CarMake.findAll({ include: { model: CarModel } });
    // console.log("first car makes: " + carMakes);

    if (hasLength(carMakes)) {
      const carMakeImages = await processCarImages(carMakes);
      return sendResponse(res, 200, true, "Record Found", carMakeImages);
    }
  } catch (error) {
    console.log("ERROR FROM GET CAR MAKES CONTROLLER: " + error.message);
    next(error);
  }
};

//
exports.getCarModel = async (req, res, next) => {
  const { make_id } = req.body;
  try {
    const carModels = await CarModel.findAll({ where: { make_id } });

    return hasLength(carModels)
      ? sendResponse(res, 200, true, "Result(s) found...", carModels)
      : sendResponse(res, 404, false, "No result found.", {});
  } catch (error) {
    console.log("ERROR FROM GET CAR MODELS CONTROLLER: " + error.message);
    next(error);
  }
};

// GET CAR BODY TYPES
exports.getCarBodyTypes = async (req, res, next) => {
  try {
    const bodyType = await CarBodyType.findAll();

    return hasLength(bodyType)
      ? sendResponse(res, 200, true, "Result(s) found...", bodyType)
      : sendResponse(res, 404, false, "No result found.", {});
  } catch (error) {
    console.log("ERROR FROM GET CAR BODY TYPES CONTROLLER: " + error.message);
    next(error);
  }
};

// SEARCH CAR INVENTORY
exports.searchCarInventory = async (req, res, next) => {
  const { condition, carType, make, model } = req.query;

  const whereClause = {};

  if (condition) whereClause.condition = condition;
  if (carType) whereClause.carType = carType;
  if (make) whereClause.make = make;
  if (model) whereClause.model = model;

  console.log("Filtering with:", whereClause);

  try {
    const cars = await Car.findAll({ where: whereClause });
    if (hasLength(cars)) {
      const carImages = await processCarImages(cars);
      return sendResponse(res, 200, true, "Result(s) found...", carImages);
    }
    return sendResponse(res, 404, false, "No result found.", {});
  } catch (error) {
    console.log("ERROR FROM SEARCH CAR INVENTORY CONTROLLER: " + error.message);
    next(error);
  }
};
