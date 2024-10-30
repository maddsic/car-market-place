"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "A-Class",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "C-Class",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "E-Class",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "S-Class",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "GLA",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "GLC",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "GLE",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "GLS",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "AMG GT",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
         {
            id: uuidv4(),
            name: "EQC",
            make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e",
            createdAt: new Date(),
            updatedAt: new Date(),
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "5f37b392-2bc6-41cf-abda-a5d53082348e" }, {});
   },
};
