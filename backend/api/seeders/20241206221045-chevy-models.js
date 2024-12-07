"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         { id: uuidv4(), name: "Malibu", make_id: "dbea2563-f7a3-47b8-a30e-b3d33840003a", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Traverse", make_id: "dbea2563-f7a3-47b8-a30e-b3d33840003a", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Tahoe", make_id: "dbea2563-f7a3-47b8-a30e-b3d33840003a", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Suburban", make_id: "dbea2563-f7a3-47b8-a30e-b3d33840003a", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Silverado 1500", make_id: "dbea2563-f7a3-47b8-a30e-b3d33840003a", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Colorado", make_id: "dbea2563-f7a3-47b8-a30e-b3d33840003a", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Camaro", make_id: "dbea2563-f7a3-47b8-a30e-b3d33840003a", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Corvette", make_id: "dbea2563-f7a3-47b8-a30e-b3d33840003a", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "dbea2563-f7a3-47b8-a30e-b3d33840003a" }, {});
   },
};