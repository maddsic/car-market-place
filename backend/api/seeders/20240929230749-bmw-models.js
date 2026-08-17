'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'BMW' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      throw new Error('BMW make not found in database');
    }

    const bmwMakeId = make[0].id;

    await queryInterface.bulkInsert('CarModel', [
      {
        id: uuidv4(),
        name: '1 Series',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: '2 Series',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: '3 Series',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: '4 Series',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: '5 Series',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: '6 Series',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: '7 Series',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: '8 Series',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'X1',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'X2',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'X3',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'X4',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'X5',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'X6',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'X7',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Z4',
        make_id: bmwMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  //
  async down(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'BMW' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      return;
    }

    const bmwMakeId = make[0].id;

    await queryInterface.bulkDelete('CarModel', { make_id: bmwMakeId }, {});
  },
};
