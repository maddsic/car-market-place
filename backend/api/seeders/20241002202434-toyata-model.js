"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "Corolla",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0", // Replace with the actual UUID of Toyota
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Camry",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Prius",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "RAV4",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Highlander",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Land Cruiser",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "4Runner",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Tacoma",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Tundra",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Avalon",
            make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "1fa213bc2-50c9-42c6-bb57-ec5df4f942b0" }, {});
   },
};
