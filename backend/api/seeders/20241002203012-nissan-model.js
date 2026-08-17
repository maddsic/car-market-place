'use strict';
const { v4: uuidv4 } = require('uuid');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Nissan' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      throw new Error('Nissan make not found in database');
    }

    const nissanMakeId = make[0].id;

    await queryInterface.bulkInsert('CarModel', [
      {
        id: uuidv4(),
        name: 'Altima',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Maxima',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Sentra',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Rogue',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Murano',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Pathfinder',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: '370Z',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'GT-R',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Frontier',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'Titan',
        make_id: nissanMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Nissan' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      return;
    }

    const nissanMakeId = make[0].id;

    await queryInterface.bulkDelete('CarModel', { make_id: nissanMakeId }, {});
  },
};
