"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "Corolla",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818", // Replace with the actual UUID of Toyota
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Camry",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Prius",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "RAV4",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Highlander",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Land Cruiser",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "4Runner",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Tacoma",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Tundra",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Avalon",
            make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "ae89653e-94db-4a84-91ef-e89b73dd4818" }, {});
   },
};
