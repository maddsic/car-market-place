'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Mercedez' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      throw new Error('Mercedes-Benz make not found in database');
    }

    const mercedesBenzMakeId = make[0].id;

    await queryInterface.bulkInsert('CarModel', [
      {
        id: uuidv4(),
        name: 'A-Class',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'C-Class',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'E-Class',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'S-Class',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'GLA',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'GLC',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'GLE',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'GLS',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'AMG GT',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
      {
        id: uuidv4(),
        name: 'EQC',
        make_id: mercedesBenzMakeId,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Mercedez' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      return;
    }

    const mercedesBenzMakeId = make[0].id;

    await queryInterface.bulkDelete(
      'CarModel',
      { make_id: mercedesBenzMakeId },
      {}
    );
  },
};
