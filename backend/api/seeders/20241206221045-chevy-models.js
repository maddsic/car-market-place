'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Chevrolet' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      throw new Error('Chevrolet make not found in database');
    }

    const chevroletMakeId = make[0].id;

    await queryInterface.bulkInsert('CarModel', [
      {
        id: uuidv4(),
        name: 'Malibu',
        make_id: chevroletMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Traverse',
        make_id: chevroletMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Tahoe',
        make_id: chevroletMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Suburban',
        make_id: chevroletMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Silverado 1500',
        make_id: chevroletMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Colorado',
        make_id: chevroletMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Camaro',
        make_id: chevroletMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Corvette',
        make_id: chevroletMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Chevrolet' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      return;
    }

    const chevroletMakeId = make[0].id;

    await queryInterface.bulkDelete(
      'CarModel',
      { make_id: chevroletMakeId },
      {}
    );
  },
};
