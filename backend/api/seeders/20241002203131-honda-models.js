"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "Civic",
            make_id: "7a0b904b-c201-4708-b621-e8ecaadb3242", // Replace with the actual UUID of Honda
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Accord",
            make_id: "7a0b904b-c201-4708-b621-e8ecaadb3242",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "CR-V",
            make_id: "7a0b904b-c201-4708-b621-e8ecaadb3242",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Pilot",
            make_id: "7a0b904b-c201-4708-b621-e8ecaadb3242",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Odyssey",
            make_id: "7a0b904b-c201-4708-b621-e8ecaadb3242",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Ridgeline",
            make_id: "7a0b904b-c201-4708-b621-e8ecaadb3242",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "HR-V",
            make_id: "7a0b904b-c201-4708-b621-e8ecaadb3242",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Passport",
            make_id: "7a0b904b-c201-4708-b621-e8ecaadb3242",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "7a0b904b-c201-4708-b621-e8ecaadb3242" }, {});
   },
};
