const express = require("express");
const router = express.Router();

const {
  createCar,
  getCars,
  getCarById,
  updateCar,
  deleteCar,
  getCarMakes,
  getCarModel,
  getCarBodyTypes,
  createCarMakes,
  getPremiumCars,
  getLatestCars,
  searchCarInventory,
} = require("./carController");

const imageUploader = require("../helpers/upload");
const { checkAuth } = require("../middlewares/verifyToken");

// ---------------- CAR MAKES -------------------------------------
router.post("/carmakes", imageUploader.single("imageUrl"), createCarMakes);
router.get("/carmakes", getCarMakes);

// ---------------- CAR MODELS ------------------------------------
router.post("/carmodels", getCarModel);

// -------------- BODY TYPES ----------------------------------
router.get("/bodyType", getCarBodyTypes);

// ------------------- PREMIUM CARS----------------------------------------------------------------
router.get("/premium-cars", getPremiumCars);

// ------------------- LATEST CARS----------------------------------------------------------------
router.get("/latest-cars", getLatestCars);

router.get("/search", searchCarInventory);

// ----------------- CAR CRUD ROUTES ------------------------------
router.post("/", checkAuth, imageUploader.array("imageUrl", 5), createCar);
router.get("/", getCars);
router.get("/:carId", getCarById);
router.put("/:carId", checkAuth, updateCar);
router.delete("/:carId", checkAuth, deleteCar);

module.exports = router;
