const { processCarImages } = require("../helpers/processCarImage");
const { User } = require("../models");
const { Op } = require("sequelize");


class CarService {
  constructor(carRepository) {
    this.carRepository = carRepository;
  }
  // ---- Helper function to build search filters based on query parameters ----------
  searchFilters = (query) => {
    const { condition, carType, make, model } = query;
    const whereClause = {};

    if (condition) whereClause.condition = condition;
    if (carType) whereClause.carType = carType;
    if (make) whereClause.make = make;
    if (model) whereClause.model = model;

    return whereClause;
  }

  // ---------- THE LOGGING HELPER ------
  async logActivity(userId, action, description) {
    try {
      await this.carRepository.createActivity({
        userId,
        action,
        description
      })
    } catch (error) {
      console.error("Failed to log activity into the database.", error)
    }
  }

  // 1. CREATE CAR
  async createCar(userId, body, files) {
    if (!userId) {
      throw new Error("Unauthorized: user not logged in");
    }

    const bodyType = await this.carRepository.findBodyTypesByName(body.carType);
    if (!bodyType) {
      throw new Error("Invalid Body Type Selected");
    }
    const form = {
      ...body,
      userId,
      imageUrl: files && files.length > 0 ? files[0].filename : "",
      carType: bodyType.typeName,
    }

    // Create the car
    const newCar = await this.carRepository.createCar(form);

    const description = `${newCar.year || ""} ${newCar.make || ""} ${newCar.model || ""}`;
    const recentActivity = await this.logActivity(userId, "CREATED", description)
    console.log("Created: RECENT ACTIVITY:-", recentActivity)


    // Handle mulitple images if they exist
    if (files && files.length > 0) {
      const images = files.map((file, index) => ({
        carId: newCar.carId,
        imageUrl: file.filename,
        isPrimary: index === 0
      }));
      await this.carRepository.bulkCreateCarImages(images);
    }
    return newCar;
  }

  // 2. GET CARS BASED ON SECTION AND VALUE
  async getCars(section, value) {
    let options = {};

    switch (section) {
      case "make":
        options.where = { make: { [Op.like]: `%${value}%` } };
        break;
      case "premium":
        options.where = { isPremium: true };
        break;
      case "latest":
        options.order = [["createdAt", "DESC"]];
        break;
      case "category":
        options.where = { category: value };
        break;
      case "inventory":
        if (value === "all") options = {};
        break;
      default:
        break;
    }

    const cars = await this.carRepository.findAllCars(options);
    return processCarImages(cars);
  }

  // 3. GET PREMIUM CARS FOR HOMEPAGE
  async getPremiumCars() {
    const cars = await this.carRepository.findAllCars({ where: { isPremium: true }, limit: 3 });
    return processCarImages(cars);
  }

  // 4. GET LATEST CARS FOR HOMEPAGE
  async getLatestCars() {
    const cars = await this.carRepository.findAllCars({
      include: [
        {
          model: User,
          as: "owner",
          attributes: ["first_name", "last_name", "phone", "role"]
        }
      ],
      // order: ["createdAt", "ASC"],
      limit: 8,

    })

    return processCarImages(cars);
  }

  // 5. GET CAR BY CAR ID
  async getCarById(carId) {
    const car = await this.carRepository.findCarById(carId);
    if (!car) return null;

    const processedCar = await processCarImages([car]);
    return processedCar[0];
  }

  // 6. UPDATE CAR
  async updateCar(carId, userId, updateForm, files) {
    // 1/ Check if car belongs to the user before update
    const car = await this.carRepository.findCarByIdAndUser(carId, userId);
    if (!car) return null;

    // 2. If the user change the carType we must validate it again
    const finalUpdateForm = { ...updateForm }

    if (updateForm.carType) {
      const bodyType = await this.carRepository.findBodyTypesByName(updateForm.carType)
      if (!bodyType) {
        throw new Error(`Invalid Car Type Selected: ${updateForm.carType}`)
      }
      finalUpdateForm.carType = bodyType.typeName
    }

    // Check if files exists
    if (files && files.length > 0) {
      finalUpdateForm.imageUrl = files[0].filename

      // Optional: Delete old images from CarImages table if you want a full replacement
      // await this.carRepository.deleteCarImages(carId);

      // Add the new images to the carImage table
      const images = files.map((file, index) => ({
        carId: carId,
        imageUrl: file.filename,
        isPrimary: index === 0
      }))
      // console.log("PREPARING TO INSERT IMAGES:", images);
      await this.carRepository.bulkCreateCarImages(images)
    }

    // Update the car
    const updatedCar = await this.carRepository.updateCar(carId, userId, finalUpdateForm);

    const description = `${finalUpdateForm.year || ""} ${finalUpdateForm.make || ""} ${finalUpdateForm.model || ""}`;
    await this.logActivity(userId, "UPDATED", description)
    console.log("updated: RECENT ACTIVITY:-", description)

    // RETURN THE FRESH DATA
    return this.carRepository.findCarById(carId);
  }

  // 15. UPDATE CAR STATUS
  async updateCarStatus(carId, userId, status) {
    const validStatuses = ["available", "sold", "inactive"];
    if (!validStatuses.includes(status)) {
      throw new Error("Invalid status value");
    }
    return await this.carRepository.updateCarStatus(carId, userId, status);
  }

  // 7. DELETE CAR
  async deleteCar(carId, userId) {
    return this.carRepository.deleteCar(carId, userId);
  }

  // 8. CREATE CAR MAKE
  async createCarMake(name, file) {
    return this.carRepository.createCarMake({ name, imageUrl: file?.filename || null });
  }

  // 10. GET MAKES
  async getCarMakes() {
    const makes = await this.carRepository.findCarMakes();
    return processCarImages(makes);
  }

  // 11. GET MODELS
  async getCarModels(make_id) {
    return this.carRepository.findCarModels(make_id);
  }

  // 12. GET BODY TYPES
  async getBodyTypes() {
    return this.carRepository.findBodyTypes();
  }

  // 13. SEARCH INVENTORY
  async searchCarInventory(query) {
    const filters = this.searchFilters(query);
    const cars = await this.carRepository.findAllCars({ where: filters });
    return processCarImages(cars);
  }


  // RECENT ACTIVITY


}


module.exports = CarService;
