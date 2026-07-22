const { hasLength, sendResponse } = require('../helpers/response');

class CarController {
  constructor(carService) {
    this.carService = carService;
  }

  // 1. CREATE CAR
  createCar = async (req, res) => {
    try {
      const userId = req.user?.userId;
      const { body, files } = req;

      const car = await this.carService.createCar(userId, body, files);

      return sendResponse(res, 201, true, 'Car created successfully', car);
    } catch (error) {
      console.error('ERROR CREATING CAR FROM CreateCar Controller:', error);
      return sendResponse(res, 500, false, error.message);
    }
  };

  // GET CARS BASED ON SECTION AND VALUE
  getCars = async (req, res) => {
    const { section, value } = req.query;
    try {
      const cars = await this.carService.getCars(section, value);
      return sendResponse(res, 200, true, 'Cars retrieved successfully', cars || [])
    } catch (error) {
      console.error('ERROR GETTING CARS FROM GetCars Controller:', error);
      return sendResponse(res, 500, false, error.message);
    }
  };

  // GET PREMIUM CARS
  getPremiumCars = async (req, res) => {
    try {
      const premiumCars = await this.carService.getPremiumCars();
      return sendResponse(
        res,
        200,
        true,
        'Premium cars retrieved successfully',
        premiumCars || []
      )
    } catch (error) {
      console.error(
        'ERROR GETTING PREMIUM CARS FROM GetPremiumCars Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };

  // GET LATEST CARS
  getLatestCars = async (req, res) => {
    try {
      const latestCars = await this.carService.getLatestCars();
      return
      sendResponse(
        res,
        200,
        true,
        'Latest cars retrieved successfully',
        latestCars || []
      )
    } catch (error) {
      console.error(
        'ERROR GETTING LATEST CARS FROM GetLatestCars Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };

  // 5. GET CAR BY CAR ID
  getCarById = async (req, res) => {
    try {
      const car = await this.carService.getCarById(req.params.carId);
      return sendResponse(res, 200, true, 'Car retrieved successfully', car)
    } catch (error) {
      console.error(
        'ERROR GETTING CAR BY ID FROM GetCarById Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };

  // UPDATE CAR BY CAR ID
  updateCar = async (req, res) => {
    const userId = req.user.userId;
    const { carId } = req.params;

    try {
      const updated = await this.carService.updateCar(
        carId,
        userId,
        req.body,
        req.files
      );

      return sendResponse(res, 200, true, 'Car updated successfully', updated)
    } catch (error) {
      console.error('ERROR UPDATING CAR FROM UpdateCar Controller:', error);
      return sendResponse(res, 500, false, error.message);
    }
  };

  // UPDATE CAR STATUS
  updateCarStatus = async (req, res) => {
    try {
      const carId = req.params.carId;
      const { status } = req.body;
      const userId = req.user?.userId;

      const updated = await this.carService.updateCarStatus(
        carId,
        userId,
        status
      );

      if (updated[0] > 0) {
        return sendResponse(res, 200, true, 'Car status updated successfully');
      } else {
        return sendResponse(
          res,
          404,
          false,
          'Car not found or status not updated'
        );
      }
    } catch (error) {
      console.error(
        'ERROR UPDATING CAR STATUS FROM updateCarStatus Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };

  // DELETE CAR BY CAR ID
  deleteCar = async (req, res) => {
    try {
      const carId = req.params.carId;
      const userId = req.user?.userId;

      const deleted = await this.carService.deleteCar(carId, userId);

      if (!deleted) {
        return sendResponse(res, 404, false, 'Car not found or already deleted');
      }
      return sendResponse(res, 200, true, 'Car deleted successfully');
    } catch (error) {
      console.error('ERROR DELETING CAR FROM DeleteCar Controller:', error);
      return sendResponse(res, 500, false, error.message);
    }
  };

  // CREATE CAR MAKES
  createCarMake = async (req, res) => {
    try {
      console.log('REQ.FILE:', req.file);
      console.log('REQ.BODY:', req.body);

      const make = await this.carService.createCarMake(req.body.name, req.file);
      return sendResponse(res, 201, true, 'Car make created successfully', make)
    } catch (error) {
      console.error(
        'ERROR CREATING CAR MAKE FROM CreateCarMake Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };

  // GET CAR MAKES
  getCarMakes = async (req, res) => {
    try {
      const makes = await this.carService.getCarMakes();
      return sendResponse(
        res,
        200,
        true,
        'Car makes retrieved successfully',
        makes || []
      )
    } catch (error) {
      console.error(
        'ERROR GETTING CAR MAKES FROM GetCarMakes Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };

  // GET CAR MODELS
  getCarModels = async (req, res) => {
    try {
      const models = await this.carService.getCarModels(req.params.make_id);
      return sendResponse(
        res,
        200,
        true,
        'Car models retrieved successfully',
        models || []
      )
    } catch (error) {
      console.error(
        'ERROR GETTING CAR MODELS FROM GetCarModels Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };

  // GET CAR BODY TYPES
  getCarBodyTypes = async (req, res) => {
    try {
      const bodyTypes = await this.carService.getBodyTypes();
      return sendResponse(res, 200, true, 'Car body types retrieved successfully', bodyTypes || [])
    } catch (error) {
      console.error(
        'ERROR GETTING CAR BODY TYPES FROM GetCarBodyTypes Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };

  // SEARCH CAR INVENTORY
  searchCarInventory = async (req, res) => {
    try {
      const cars = await this.carService.searchCarInventory(req.query);
      console.log(cars);
      return sendResponse(
        res,
        200,
        true,
        'Search results retrieved successfully',
        cars || []
      )
    } catch (error) {
      console.error(
        'ERROR SEARCHING CAR INVENTORY FROM SearchCarInventory Controller:',
        error
      );
      return sendResponse(res, 500, false, error.message);
    }
  };
}

module.exports = CarController;
