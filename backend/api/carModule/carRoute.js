const express = require("express");
const router = express.Router();

const { createCar, getCars, getCarById, updateCar, deleteCar, getCarMakes, getCarModel, getCarBodyTypes, createCarMakes } = require("./carController");

const imageUploader = require("../helpers/upload");
const { checkAuth } = require("../middlewares/verifyToken");

router.post("/", imageUploader.single("imageUrl"), createCar);
router.get("/", checkAuth, getCars);

// ---------------- CAR MAKES -------------------------------------
router.post("/carmakes", imageUploader.single("imageUrl"), createCarMakes);
router.get("/carmakes", getCarMakes);

// ---------------- CAR MODELS ------------------------------------
router.post("/carmodels", getCarModel);

// -------------- BODY TYPES ----------------------------------
router.get("/bodyType", getCarBodyTypes);

// ----------------- CAR CRUD ROUTES ------------------------------
// router.post("/", checkAuth, imageUploader.single("imageUrl"), createCar);
// router.get("/", checkAuth, getCars);
router.get("/:carId", checkAuth, getCarById);
router.put("/:carId", checkAuth, updateCar);
router.delete("/:carId", checkAuth, deleteCar);

module.exports = router;
