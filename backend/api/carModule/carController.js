const { hasLength, sendResponse } = require("../helpers/response");

class CarController {
  constructor(carService) {
    this.carService = carService;
  }

  // 1. CREATE CAR
  createCar = async (req, res) => {
    try {
      const userId = req.user?.userId;
      const { body, files } = req;

      console.log("--- BACKEND CREATE HIT ---");
      console.log("Body:", req.body);
      console.log("Files:", req.files);

      const car = await this.carService.createCar(userId, body, files);

      return sendResponse(res, 201, true, "Car created successfully", car);
    } catch (error) {
      console.error("ERROR CREATING CAR FROM CreateCar Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // GET CARS BASED ON SECTION AND VALUE
  getCars = async (req, res) => {
    const { section, value } = req.query;
    try {
      const cars = await this.carService.getCars(section, value);
      return hasLength(cars) ? sendResponse(res, 200, true, "Cars retrieved successfully", cars) : sendResponse(res, 404, false, "No REcord Found");
    } catch (error) {
      console.error("ERROR GETTING CARS FROM GetCars Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // GET PREMIUM CARS
  getPremiumCars = async (req, res) => {
    try {
      const premiumCars = await this.carService.getPremiumCars();
      return hasLength(premiumCars) ? sendResponse(res, 200, true, "Premium cars retrieved successfully", premiumCars) : sendResponse(res, 404, false, "No Record Found");
    } catch (error) {
      console.error("ERROR GETTING PREMIUM CARS FROM GetPremiumCars Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // GET LATEST CARS
  getLatestCars = async (req, res) => {
    try {
      const latestCars = await this.carService.getLatestCars();
      return hasLength(latestCars) ? sendResponse(res, 200, true, "Latest cars retrieved successfully", latestCars) : sendResponse(res, 404, false, "No Record Found");
    } catch (error) {
      console.error("ERROR GETTING LATEST CARS FROM GetLatestCars Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // 5. GET CAR BY CAR ID
  getCarById = async (req, res) => {
    try {
      const car = await this.carService.getCarById(req.params.carId);

      return hasLength(car) ? sendResponse(res, 200, true, "Car retrieved successfully", car) : sendResponse(res, 404, false, "No Record Found");
    } catch (error) {
      console.error("ERROR GETTING CAR BY ID FROM GetCarById Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // UPDATE CAR BY CAR ID
  updateCar = async (req, res) => {
    const userId = req.user.userId;
    const { carId } = req.params;

    console.log("--- BACKEND UPDATE HIT ---");
    // console.log("Body:", req.body);
    // console.log("Files:", req.files);
    console.log("carID:", carId)

    try {
      const updated = await this.carService.updateCar(carId, userId, req.body, req.files);
      return updated ? sendResponse(res, 200, true, "Car updated successfully", updated) : sendResponse(res, 404, false, "No Record Found");
    } catch (error) {
      console.error("ERROR UPDATING CAR FROM UpdateCar Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // UPDATE CAR STATUS
  updateCarStatus = async (req, res) => {
    try {
      const carId = req.params.carId;
      const { status } = req.body;
      const userId = req.user?.userId;

      console.log("DEBUG: Body:", req.body);
      console.log("DEBUG: Params:", req.params);
      console.log("DEBUG: User:", req.user?.userId);

      const updated = await this.carService.updateCarStatus(carId, userId, status);

      if (updated[0] > 0) {
        return sendResponse(res, 200, true, "Car status updated successfully");
      } else {
        return sendResponse(res, 404, false, "Car not found or status not updated");
      }
    } catch (error) {
      console.error("ERROR UPDATING CAR STATUS FROM updateCarStatus Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // DELETE CAR BY CAR ID
  deleteCar = async (req, res) => {
    try {
      const carId = req.params.carId;
      const userId = req.user?.userId;

      console.log("DEBUG: Params:", req.params);
      console.log("DEBUG: User:", req.user?.userId);

      const deleted = await this.carService.deleteCar(carId, userId);
      return deleted ? sendResponse(res, 200, true, "Car deleted successfully", {}) : sendResponse(res, 404, false, "No Record Found");
    } catch (error) {
      console.error("ERROR DELETING CAR FROM DeleteCar Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // CREATE CAR MAKES
  createCarMake = async (req, res) => {
    try {
      const make = await this.carService.createCarMake(req.body.name, req.file);
      return make ? sendResponse(res, 201, true, "Car make created successfully", make) : sendResponse(res, 400, false, "Failed to create car make");
    } catch (error) {
      console.error("ERROR CREATING CAR MAKE FROM CreateCarMake Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // GET CAR MAKES
  getCarMakes = async (req, res) => {
    try {
      const makes = await this.carService.getCarMakes();
      return hasLength(makes) ? sendResponse(res, 200, true, "Car makes retrieved successfully", makes) : sendResponse(res, 404, false, "No Record Found");
    } catch (error) {
      console.error("ERROR GETTING CAR MAKES FROM GetCarMakes Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // GET CAR MODELS
  getCarModels = async (req, res) => {
    try {
      const models = await this.carService.getCarModels(req.params.make_id);
      return hasLength(models) ? sendResponse(res, 200, true, "Car models retrieved successfully", models) : sendResponse(res, 404, false, "No Record Found");
    } catch (error) {
      console.error("ERROR GETTING CAR MODELS FROM GetCarModels Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // GET CAR BODY TYPES
  getCarBodyTypes = async (req, res) => {
    try {
      const bodyTypes = await this.carService.getBodyTypes();
      return hasLength(bodyTypes) ? sendResponse(res, 200, true, "Car body types retrieved successfully", bodyTypes) : sendResponse(res, 404, false, "No Record Found");
    } catch (error) {
      console.error("ERROR GETTING CAR BODY TYPES FROM GetCarBodyTypes Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

  // SEARCH CAR INVENTORY
  searchCarInventory = async (req, res) => {
    try {
      const cars = await this.carService.searchCarInventory(req.query);
      console.log(cars)
      return hasLength(cars) ? sendResponse(res, 200, true, "Search results retrieved successfully", cars) : sendResponse(res, 404, false, "No Record Found");
    } catch (error) {
      console.error("ERROR SEARCHING CAR INVENTORY FROM SearchCarInventory Controller:", error);
      return sendResponse(res, 500, false, error.message);
    }
  }

}

module.exports = CarController;
