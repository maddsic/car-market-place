"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         { id: uuidv4(), name: "RX 350", make_id: "71adb301-071a-4d0e-9571-a7d8e93ceec6", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "ES 300h", make_id: "71adb301-071a-4d0e-9571-a7d8e93ceec6", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "GX 460", make_id: "71adb301-071a-4d0e-9571-a7d8e93ceec6", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "LX 600", make_id: "71adb301-071a-4d0e-9571-a7d8e93ceec6", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "NX 350", make_id: "71adb301-071a-4d0e-9571-a7d8e93ceec6", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "IS 500", make_id: "71adb301-071a-4d0e-9571-a7d8e93ceec6", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "RC 350", make_id: "71adb301-071a-4d0e-9571-a7d8e93ceec6", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "UX 250h", make_id: "71adb301-071a-4d0e-9571-a7d8e93ceec6", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "71adb301-071a-4d0e-9571-a7d8e93ceec6" }, {});
   },
};