"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "Corolla",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200", // Replace with the actual UUID of Toyota
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Camry",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Prius",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "RAV4",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Highlander",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Land Cruiser",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "4Runner",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Tacoma",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Tundra",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Avalon",
            make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "2e612bc2-dd42-414b-bc82-00d401ba9200" }, {});
   },
};
