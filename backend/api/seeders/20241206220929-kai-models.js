'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Kia' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      throw new Error('Kia make not found in database');
    }

    const kiaMakeId = make[0].id;

    await queryInterface.bulkInsert('CarModel', [
      {
        id: uuidv4(),
        name: 'Seltos',
        make_id: kiaMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Sportage',
        make_id: kiaMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Sorento',
        make_id: kiaMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Telluride',
        make_id: kiaMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Soul',
        make_id: kiaMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'K5',
        make_id: kiaMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Forte',
        make_id: kiaMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Carnival',
        make_id: kiaMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Kia' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      return;
    }

    const kiaMakeId = make[0].id;

    await queryInterface.bulkDelete('CarModel', { make_id: kiaMakeId }, {});
  },
};
