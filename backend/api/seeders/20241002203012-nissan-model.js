"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "Altima",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5", // Replace with the actual UUID of Nissan
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Maxima",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Sentra",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Rogue",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Murano",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Pathfinder",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "370Z",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "GT-R",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Frontier",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Titan",
            make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "fefbf4e0-4fe0-47fc-9d41-0473b3c066d5" }, {});
   },
};
