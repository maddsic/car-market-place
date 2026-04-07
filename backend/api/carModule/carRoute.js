const express = require('express');
const router = express.Router();

// IMPORT MIDDLEWARES
const { carUploader } = require('../helpers/upload');
const Auth = require('../middlewares/authMiddleware');


// IMPORT LAYERS
const CarController = require('./carController');
const CarService = require('./carService');
const CarRepository = require('./carRepository');

// INSTANTIATE LAYERS
const carRepository = new CarRepository();
const carService = new CarService(carRepository);
const carController = new CarController(carService);

// ---------------- CAR MAKES -------------------------------------
router.post(
  '/carmakes',
  carUploader.single('imageUrl'),
  carController.createCarMake
);

router.get('/carmakes', carController.getCarMakes);

// ---------------- CAR MODELS ------------------------------------
router.post('/carmodels', carController.getCarModels);

// -------------- BODY TYPES ----------------------------------
router.get('/bodyType', carController.getCarBodyTypes);

// ------------------- PREMIUM CARS --------------------------------
router.get('/premium-cars', carController.getPremiumCars);

// ------------------- LATEST CARS --------------------------------
router.get('/latest-cars', carController.getLatestCars);

// ------------------- SEARCH --------------------------------------
router.get('/search', carController.searchCarInventory);

// ----------------- CAR CRUD ROUTES ------------------------------

// CREATE
router.post(
  '/',
  Auth.checkAuth,
  carUploader.array('imageUrl', 5),
  carController.createCar
);

// GET ALL
router.get('/', carController.getCars);

// GET BY ID (Keep this AFTER other GET routes)
router.get('/:carId', carController.getCarById);

// UPDATE
router.put(
  '/update/:carId',
  Auth.checkAuth, Auth.verifyCarOwnership,
  carUploader.array('imageUrl', 5),
  carController.updateCar
);
router.patch('/:carId/status', Auth.checkAuth, Auth.verifyCarOwnership, carController.updateCarStatus);

// DELETE
router.delete('/:carId', Auth.checkAuth, Auth.verifyCarOwnership, carController.deleteCar);

module.exports = router;
