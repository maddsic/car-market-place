"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "Altima",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38", // Replace with the actual UUID of Nissan
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Maxima",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Sentra",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Rogue",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Murano",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Pathfinder",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "370Z",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "GT-R",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Frontier",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "Titan",
            make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "4b5e1703-2863-4048-b42e-b6d38201bf38" }, {});
   },
};
