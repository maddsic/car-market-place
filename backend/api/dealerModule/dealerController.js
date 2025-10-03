const { processCarImages } = require("../helpers/processCarImage");
const { sendResponse, hasLength } = require("../helpers/response");
const { Sequelize } = require("../models");

// Seeach dealers controllers and return dealer name, casrsCount, telephone number, location
const Car = require("../models").Car;
const User = require("../models").User;

exports.getDealers = async (req, res, next) => {
  try {
    const dealers = await User.findAll({
      where: { role: "agent" },
      group: ["User.userId"],
      attributes: [
        "username",
        "phone",
        "address",
        "role",
        "userId",
        [Sequelize.fn("COUNT", Sequelize.col("cars.carId")), "carsCount"],
      ],
      include: {
        model: Car,
        as: "cars",
        attributes: [],
        required: true,
      },
    });

    if (hasLength(dealers)) {
      return sendResponse(res, 200, true, "Dealers found", dealers);
    } else {
      return sendResponse(res, 404, false, "No dealers found", {});
    }
  } catch (error) {
    console.log("ERROR FROM GET DEALERS CONTROLLER: " + error.message);
    next(error);
  }
};

exports.searchDealers = async (req, res, next) => {
  const { condition, make, model } = req.query;

  const filters = {};

  if (condition) filters.condition = condition;
  if (make) filters.make = make;
  if (model) filters.model = model;

  console.log("DEALERS API - Filtering with:", filters);

  try {
    const dealersFound = await User.findAll({
      // Select dealers who have cars matching the criteria and count their cars
      where: { role: "agent" },
      //   Group by users ID
      group: ["User.userId"],
      attributes: [
        "userId",
        "username",
        "phone",
        "address",
        "role",
        [Sequelize.fn("COUNT", Sequelize.col("cars.carId")), "carsCount"],
      ],
      include: [
        {
          model: Car,
          as: "cars",
          where: filters,
          attributes: [],
          required: true,
        },
      ],
      //   group: ["User.userId"],
    });

    if (hasLength(dealersFound)) {
      return sendResponse(res, 200, true, "Result(s) found...", dealersFound);
    } else {
      return sendResponse(res, 404, false, "No result found.", {});
    }
  } catch (error) {
    console.log(
      "ERROR FROM SEARCH DEALER CAR INVENTORY CONTROLLER: " + error.message
    );
    next(error);
  }
};

exports.getDealerFilteredCarParams = async (req, res, next) => {
  const { condition, make, model } = req.query;
  const { userId } = req.params;

  if (!userId) {
    return sendResponse(res, 400, false, "User ID is required.", {});
  }

  const filters = {};

  if (condition) filters.condition = condition;
  if (make) filters.make = make;
  if (model) filters.model = model;

  console.log("DEALERS API - Filtering with:", filters);

  try {
    const dealerFound = await User.findOne({
      // Select dealers who have cars matching the criteria and count their cars
      where: { role: "agent", userId: userId },
      attributes: ["userId", "username", "phone", "address", "role", "email"],
      include: [
        {
          model: Car,
          as: "cars",
          where: filters,
          attributes: [
            "carId",
            "make",
            "model",
            "condition",
            "price",
            "imageUrl",
          ],
          required: true,
        },
      ],
      //   group: ["User.userId"],
    });

    if (hasLength(dealerFound)) {
      const data = dealerFound.toJSON();
      data.cars = await processCarImages(data.cars);

      return sendResponse(res, 200, true, "Result(s) found...", data);
    } else {
      return sendResponse(res, 404, false, "No result found.", {});
    }
  } catch (error) {
    console.log(
      "ERROR FROM SEARCH DEALER CAR INVENTORY CONTROLLER: " + error.message
    );
    next(error);
  }
};
