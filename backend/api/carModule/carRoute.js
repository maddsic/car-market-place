const express = require("express");
const router = express.Router();

const { createCar, getCars, getCarById, updateCar, deleteCar, getCarMakes, getCarModel, getCarBodyTypes } = require("./carController");

const imageUploader = require("../helpers/upload");
const { checkAuth } = require("../middlewares/verifyToken");

// ---------------- CAR MODELS ------------------------------------
router.post("/carmodels", getCarModel);

// ---------------- CAR MAKES -------------------------------------
router.get("/carmakes", getCarMakes);

// -------------- BODY TYPES ----------------------------------
router.get("/bodyType", getCarBodyTypes);

// ----------------- CAR CRUD ROUTES ------------------------------
router.post("/", checkAuth, imageUploader.single("imageUrl"), createCar);
router.get("/", checkAuth, getCars);
router.get("/:carId", checkAuth, getCarById);
router.put("/:carId", checkAuth, updateCar);
router.delete("/:carId", checkAuth, deleteCar);

module.exports = router;
