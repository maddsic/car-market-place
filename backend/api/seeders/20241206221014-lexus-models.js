'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Lexus' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      throw new Error('Lexus make not found in database');
    }

    const lexusMakeId = make[0].id;

    await queryInterface.bulkInsert('CarModel', [
      {
        id: uuidv4(),
        name: 'RX 350',
        make_id: lexusMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'ES 300h',
        make_id: lexusMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'GX 460',
        make_id: lexusMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'LX 600',
        make_id: lexusMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'NX 350',
        make_id: lexusMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'IS 500',
        make_id: lexusMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'RC 350',
        make_id: lexusMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'UX 250h',
        make_id: lexusMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Lexus' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      return;
    }

    const lexusMakeId = make[0].id;

    await queryInterface.bulkDelete('CarModel', { make_id: lexusMakeId }, {});
  },
};
