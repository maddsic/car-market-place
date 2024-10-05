"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "Golf",
            make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c", // Replace with the actual UUID of VW
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Jetta",
            make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Passat",
            make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Tiguan",
            make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Atlas",
            make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Touareg",
            make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Arteon",
            make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "ID.4",
            make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "Beetle",
            make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "eb19117a-afee-41bb-9ac8-68f61482c46c" }, {});
   },
};
