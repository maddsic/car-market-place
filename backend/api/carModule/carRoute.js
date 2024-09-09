const express = require("express");
const { createCar, getCars, getCarById, updateCar, deleteCar } = require("./carController");
const imageUploader = require("../helpers/upload");
const { checkAuth } = require("../middlewares/verifyToken");
const router = express.Router();

router.post("/", checkAuth, imageUploader.single("imageUrl"), createCar);
router.get("/", checkAuth, getCars);
router.get("/:carId", checkAuth, getCarById);
router.put("/:carId", checkAuth, updateCar);
router.delete("/:carId", checkAuth, deleteCar);

module.exports = router;
