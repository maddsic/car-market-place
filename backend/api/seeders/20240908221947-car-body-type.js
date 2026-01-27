"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   async up(queryInterface, Sequelize) {
      return queryInterface.bulkInsert("CarBodyType", [
         {
            typeId: "1a2b3c4d-1234-5678-abcd-1234567890ab",
            typeName: "SUV",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            typeId: "2b3c4d5e-2345-6789-bcde-234567890abc",
            typeName: "Truck",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            typeId: "3c4d5e6f-3456-7890-cdef-34567890abcd",
            typeName: "Sedan",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            typeId: "4d5e6f7g-4567-8901-def0-4567890abcde",
            typeName: "Coupe",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            typeId: "5e6f7g8h-5678-9012-ef01-567890abcdef",
            typeName: "Convertible",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            typeId: "6f7g8h9i-6789-0123-f012-67890abcdef1",
            typeName: "Hatchback",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            typeId: "7g8h9i0j-7890-1234-0123-7890abcdef12",
            typeName: "Minivan",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            typeId: "8h9i0j1k-8901-2345-1234-890abcdef123",
            typeName: "Wagon",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            typeId: "9i0j1k2l-9012-3456-2345-901abcdef234",
            typeName: "Pickup Truck",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
         {
            typeId: "0j1k2l3m-0123-4567-3456-012abcdef345",
            typeName: "Crossover",
            createdAt: new Date(),
            updatedAt: new Date(),
            deletedAt: null,
         },
      ]);
   },

   async down(queryInterface, Sequelize) {
      return queryInterface.bulkDelete("CarBodyType", null, {});
   },
};
