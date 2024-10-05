const express = require("express");
const router = express.Router();

const { createCar, getCars, getCarById, updateCar, deleteCar, getCarMakes, getCarModel } = require("./carController");

const imageUploader = require("../helpers/upload");
const { checkAuth } = require("../middlewares/verifyToken");

router.post("/carmodels", getCarModel);
router.get("/carmakes", getCarMakes);
router.post("/", checkAuth, imageUploader.single("imageUrl"), createCar);
router.get("/", checkAuth, getCars);
router.get("/:carId", checkAuth, getCarById);
router.put("/:carId", checkAuth, updateCar);
router.delete("/:carId", checkAuth, deleteCar);

module.exports = router;
