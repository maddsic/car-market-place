"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "Civic",
            make_id: "78182f89-fd22-48b7-8150-2f8d4a3f1a6a", 
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Accord",
            make_id: "78182f89-fd22-48b7-8150-2f8d4a3f1a6a",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "CR-V",
            make_id: "78182f89-fd22-48b7-8150-2f8d4a3f1a6a",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Pilot",
            make_id: "78182f89-fd22-48b7-8150-2f8d4a3f1a6a",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Odyssey",
            make_id: "78182f89-fd22-48b7-8150-2f8d4a3f1a6a",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Ridgeline",
            make_id: "78182f89-fd22-48b7-8150-2f8d4a3f1a6a",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "HR-V",
            make_id: "78182f89-fd22-48b7-8150-2f8d4a3f1a6a",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Passport",
            make_id: "78182f89-fd22-48b7-8150-2f8d4a3f1a6a",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "78182f89-fd22-48b7-8150-2f8d4a3f1a6a" }, {});
   },
};
