'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const { v4: uuidv4 } = require('uuid');

    return queryInterface.bulkInsert('CarBodyType', [
      {
        typeId: uuidv4(),
        typeName: 'SUV',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        typeId: uuidv4(),
        typeName: 'Truck',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        typeId: uuidv4(),
        typeName: 'Sedan',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        typeId: uuidv4(),
        typeName: 'Coupe',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        typeId: uuidv4(),
        typeName: 'Convertible',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        typeId: uuidv4(),
        typeName: 'Hatchback',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        typeId: uuidv4(),
        typeName: 'Minivan',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        typeId: uuidv4(),
        typeName: 'Wagon',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        typeId: uuidv4(),
        typeName: 'Pickup Truck',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        typeId: uuidv4(),
        typeName: 'Crossover',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('CarBodyType', null, {});
  },
};
