"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         { id: uuidv4(), name: "Explorer", make_id: "582e7c09-da61-494a-ab7e-aad4771e791b", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Mustang", make_id: "582e7c09-da61-494a-ab7e-aad4771e791b", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "F-150", make_id: "582e7c09-da61-494a-ab7e-aad4771e791b", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Ranger", make_id: "582e7c09-da61-494a-ab7e-aad4771e791b", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Bronco", make_id: "582e7c09-da61-494a-ab7e-aad4771e791b", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Edge", make_id: "582e7c09-da61-494a-ab7e-aad4771e791b", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Escape", make_id: "582e7c09-da61-494a-ab7e-aad4771e791b", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Expedition", make_id: "582e7c09-da61-494a-ab7e-aad4771e791b", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "582e7c09-da61-494a-ab7e-aad4771e791b" }, {});
   },
};