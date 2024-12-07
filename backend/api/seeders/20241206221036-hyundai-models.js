"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         { id: uuidv4(), name: "Elantra", make_id: "d79667d9-52c8-4059-9a58-8fae6539855e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Sonata", make_id: "d79667d9-52c8-4059-9a58-8fae6539855e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Tucson", make_id: "d79667d9-52c8-4059-9a58-8fae6539855e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Santa Fe", make_id: "d79667d9-52c8-4059-9a58-8fae6539855e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Palisade", make_id: "d79667d9-52c8-4059-9a58-8fae6539855e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Kona", make_id: "d79667d9-52c8-4059-9a58-8fae6539855e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Veloster", make_id: "d79667d9-52c8-4059-9a58-8fae6539855e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
         { id: uuidv4(), name: "Ioniq 5", make_id: "d79667d9-52c8-4059-9a58-8fae6539855e", createdAt: new Date(), updatedAt: new Date(), deletedAt: null },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "d79667d9-52c8-4059-9a58-8fae6539855e" }, {});
   },
};