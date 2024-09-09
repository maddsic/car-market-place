const express = require("express");
const { createCar, getCars, getCarById, updateCar, deleteCar } = require("./carController");
const imageUploader = require("../helpers/upload");
const router = express.Router();

router.post("/", imageUploader.single("imageUrl"), createCar);
router.get("/", getCars);
router.get("/:carId", getCarById);
router.put("/:carId", updateCar);
router.delete("/:carId", deleteCar);

module.exports = router;
