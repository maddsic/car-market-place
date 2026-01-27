"use strict";
const { v4: uuidv4 } = require("uuid");

module.exports = {
   async up(queryInterface, Sequelize) {
      await queryInterface.bulkInsert("CarModel", [
         {
            id: uuidv4(),
            name: "A-Class",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "C-Class",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "E-Class",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "S-Class",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "GLA",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "GLC",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "GLE",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "GLS",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "AMG GT",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            id: uuidv4(),
            name: "EQC",
            make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      await queryInterface.bulkDelete("CarModel", { make_id: "8eddf578-8dba-44f7-87c3-ddf92a1c5c78" }, {});
   },
};
