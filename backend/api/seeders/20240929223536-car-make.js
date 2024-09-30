"use strict";

const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarMake", [
         { id: uuidv4(), name: "Acura", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Audi", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "BMW", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Chevrolet", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Dodge", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Ford", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Honda", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Hyundai", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Jeep", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Kia", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Lexus", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Mazda", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Mercedes-Benz", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Nissan", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Subaru", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Tesla", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Toyota", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Volkswagen", createdAt: new Date(), updatedAt: new Date() },
         { id: uuidv4(), name: "Volvo", createdAt: new Date(), updatedAt: new Date() },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarMake", null, {});
   },
};
