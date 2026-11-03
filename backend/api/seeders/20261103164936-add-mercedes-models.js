'use strict';
const { v4: uuidv4 } = require('uuid');

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Get the Mercedes make ID
    const [make] = await queryInterface.sequelize.query(
      `SELECT id FROM CarMake WHERE name = 'Mercedes' LIMIT 1;`
    );

    if (!make || make.length === 0) {
      console.warn('⚠️ Mercedes make not found in CarMake table. Skipping.');
      return;
    }

    const mercedesMakeId = make[0].id;
    const now = new Date();

    // 2. Full list of models and popular badges
    const newModels = [
      // Core Series
      'A-Class',
      'B-Class',
      'C-Class',
      'E-Class',
      'S-Class',
      'CLA',
      'CLS',
      'CLE',

      // SUVs & Crossovers
      'GLA',
      'GLB',
      'GLC',
      'GLE',
      'GLS',
      'G-Class',
      'GL-Class',
      'ML-Class',
      'GLK',

      // Sports & GT
      'SL-Class',
      'SLC',
      'SLK',
      'AMG GT',

      // Commercial / Transporters
      'Sprinter',
      'Vito',
      'V-Class',

      // Popular specific badges
      'C 180',
      'C 200',
      'C 220',
      'C 250',
      'C 300',
      'E 200',
      'E 220',
      'E 250',
      'E 300',
      'E 350',
      'ML 350',
      'GLE 350',
      'GLE 450',
    ];

    // 3. Fetch existing Mercedes models to avoid duplicate inserts
    const [existingRecords] = await queryInterface.sequelize.query(
      `SELECT name FROM CarModel WHERE make_id = '${mercedesMakeId}';`
    );
    const existingNames = new Set(existingRecords.map((r) => r.name.toLowerCase()));

    // 4. Filter only names that aren't already in the database
    const toInsert = newModels
      .filter((name) => !existingNames.has(name.toLowerCase()))
      .map((name) => ({
        id: uuidv4(),
        name,
        make_id: mercedesMakeId,
        createdAt: now,
        updatedAt: now,
        deletedAt: null,
      }));

    if (toInsert.length > 0) {
      await queryInterface.bulkInsert('CarModel', toInsert);
      console.log(`✅ Successfully seeded ${toInsert.length} new Mercedes models.`);
    } else {
      console.log('ℹ️ All specified models already exist. Nothing to insert.');
    }
  },

  async down(queryInterface, Sequelize) {
    // Optional rollback logic
  },
};
