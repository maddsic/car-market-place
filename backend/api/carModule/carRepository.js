const db = require("../models")

class CarRepository {
  constructor() {
    this.models = db;
  }
  // FIND BODY TYPE BY NAME
  async findBodyTypesByName(typeName) {
    return this.models.CarBodyType.findOne({ where: { typeName } });
  }

  //  FIND ALL BODY TYPES
  async findBodyTypes() {
    return this.models.CarBodyType.findAll();
  }

  //  FIND CAR MODELS BY MAKE ID
  async findCarModels(make_id) {
    return this.models.CarModel.findAll({ where: { make_id } });
  }

  // FIND ALL CARS
  async findAllCars(options = {}) {
    return this.models.Car.findAll(options);
  }

  //  FIND CAR BY ID
  async findCarById(carId) {
    return this.models.Car.findOne({
      where: { carId },
      include: [
        {
          model: this.models.CarImage, as: "images",
          attributes: ["imageId", "imageUrl", "isPrimary"]
        },
        {
          model: this.models.User, as: "owner",
        },
      ]
    });
  }

  async findCarByIdAndUser(carId, userId) {
    return await this.models.Car.findOne({ where: { carId, userId } })
  }

  // FIND CAR MAKES
  async findCarMakes() {
    return await this.models.CarMake.findAll({
      include: {
        model: this.models.CarModel,
        include: {
          model: this.models.CarModelYear,
          as: "years"
        },
        order: ["year", "ASC"]
      }
    });
  }

  // CREATE CAR
  async createCar(data) {
    return this.models.Car.create(data);
  }

  // BULK CREATE CAR IMAGES
  async bulkCreateCarImages(images) {
    return this.models.CarImage.bulkCreate(images);
  }

  // CREATE CAR MAKE
  async createCarMake(name) {
    return await this.models.CarMake.create({ name });
  }

  //  UPDATE CAR
  async updateCar(carId, userId, updateForm) {
    return this.models.Car.update(updateForm, { where: { carId, userId } });
  }

  // UPDATE CAR STATUS
  async updateCarStatus(carId, userId, status) {
    return await this.models.Car.update(
      { status: status },
      { where: { carId, userId } }
    )
  }

  //  DELETE CAR
  async deleteCar(carId, userId) {
    return await this.models.Car.destroy({ where: { carId, userId } });
  }


  // ---------------------------------------- RECENT ACTIVITY ---------------------------------------
  // Create recent activities
  async createActivity(activityData) {
    return await this.models.Activity.create(activityData)
  }

  // Find REcent activities
  async findRecentActivities(userId, limit = 5) {
    return await this.models.Activity.findAll({
      where: { userId: userId },
      order: [["createdAt", "DESC"]],
      limit: limit
    })
  }




}

module.exports = CarRepository;
