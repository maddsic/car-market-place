"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         { id: uuidv4(), name: "Seltos", make_id: "2e9ea757-0102-4d29-9ff5-0964a805248e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Sportage", make_id: "2e9ea757-0102-4d29-9ff5-0964a805248e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Sorento", make_id: "2e9ea757-0102-4d29-9ff5-0964a805248e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Telluride", make_id: "2e9ea757-0102-4d29-9ff5-0964a805248e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Soul", make_id: "2e9ea757-0102-4d29-9ff5-0964a805248e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "K5", make_id: "2e9ea757-0102-4d29-9ff5-0964a805248e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Forte", make_id: "2e9ea757-0102-4d29-9ff5-0964a805248e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Carnival", make_id: "2e9ea757-0102-4d29-9ff5-0964a805248e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "2e9ea757-0102-4d29-9ff5-0964a805248e" }, {});
   },
};