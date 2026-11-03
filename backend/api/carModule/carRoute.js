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

// ------------------- RENTAL CARS --------------------------------
router.get('/rental-cars', carController.getRentalCars);

// ------------------- SEARCH --------------------------------------
router.get('/search', carController.searchCarInventory);

// ----------------- CAR CRUD ROUTES ------------------------------

// CREATE
router.post(
  '/',
  Auth.checkAuth,
  carUploader.array('imageUrl', 10),
  carController.createCar
);

// router.post(
//   '/',
//   Auth.checkAuth,
//   (req, res, next) => {
//     carUploader.array('imageUrl', 10)(req, res, (err) => {
//       if (err) {
//         console.error('--- MULTER / CLOUDINARY REJECTION ---');
//         console.error('Error Message:', err.message);
//         console.error('HTTP Code:', err.http_code);
//         console.dir(err, { depth: null });
//         return res.status(400).json({
//           success: false,
//           message: err.message,
//           error: err,
//         });
//       }
//       next();
//     });
//   },
//   carController.createCar
// );

// GET ALL
router.get('/', carController.getCars);

// GET BY ID (Keep this AFTER other GET routes)
router.get('/:carId', carController.getCarById);

// UPDATE
router.put(
  '/update/:carId',
  Auth.checkAuth, Auth.verifyCarOwnership,
  carUploader.array('imageUrl', 10),
  carController.updateCar
);
router.patch('/:carId/status', Auth.checkAuth, Auth.verifyCarOwnership, carController.updateCarStatus);

// DELETE
router.delete('/:carId', Auth.checkAuth, Auth.verifyCarOwnership, carController.deleteCar);

module.exports = router;
