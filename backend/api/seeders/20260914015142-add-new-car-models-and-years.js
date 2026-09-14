'use strict';
const { v4: uuidv4 } = require('uuid');

const carData = [
  { make: 'Audi', models: ['A3', 'A4', 'A6', 'A8', 'Q3', 'Q5', 'Q7', 'Q8', 'e-tron', 'R8'] },
  { make: 'Cadillac', models: ['Escalade', 'CT4', 'CT5', 'XT4', 'XT5', 'XT6', 'Lyriq'] },
  { make: 'GMC', models: ['Sierra 1500', 'Yukon', 'Yukon XL', 'Acadia', 'Terrain', 'Canyon'] },
  { make: 'Infiniti', models: ['Q50', 'Q60', 'QX50', 'QX55', 'QX60', 'QX80'] },
  { make: 'Jeep', models: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Gladiator', 'Compass', 'Renegade'] },
  { make: 'Land Rover', models: ['Range Rover', 'Range Rover Sport', 'Range Rover Velar', 'Defender', 'Discovery'] },
  { make: 'Mitsubishi', models: ['Outlander', 'Eclipse Cross', 'Mirage', 'Lancer', 'Pajero'] },
  { make: 'Opel', models: ['Corsa', 'Astra', 'Mokka', 'Grandland', 'Insignia', 'Frontera'] },
  { make: 'Subaru', models: ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'WRX', 'Legacy'] },
  { make: 'Suzuki', models: ['Swift', 'Jimny', 'Vitara', 'S-Cross', 'Baleno'] },
  { make: 'Volkswagen', models: ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf', 'ID.4', 'Arteon'] }
];

module.exports = {
  async up(queryInterface, Sequelize) {
    const startYear = 2010;
    const endYear = 2026;

    for (const item of carData) {
      // 1. Fetch the existing Make ID from CarMake table
      const [makes] = await queryInterface.sequelize.query(
        `SELECT id FROM CarMake WHERE LOWER(name) = LOWER(${queryInterface.sequelize.escape(item.make)}) LIMIT 1;`
      );

      if (!makes || makes.length === 0) {
        console.warn(`Make "${item.make}" not found in CarMake table. Skipping models for this brand.`);
        continue;
      }

      const makeId = makes[0].id;

      for (const modelName of item.models) {
        // 2. Check if the model already exists under this make
        const [existingModels] = await queryInterface.sequelize.query(
          `SELECT id FROM CarModel WHERE make_id = ${queryInterface.sequelize.escape(makeId)} AND LOWER(name) = LOWER(${queryInterface.sequelize.escape(modelName)}) LIMIT 1;`
        );

        let modelId;

        if (existingModels && existingModels.length > 0) {
          modelId = existingModels[0].id;
        } else {
          // Insert new model
          modelId = uuidv4();
          await queryInterface.bulkInsert('CarModel', [{
            id: modelId,
            name: modelName,
            make_id: makeId,
            createdAt: new Date(),
            updatedAt: new Date()
          }], { ignoreDuplicates: true });
        }

        // 3. Prepare years 2010 to 2026 for this model
        const yearRecords = [];
        for (let year = startYear; year <= endYear; year++) {
          yearRecords.push({
            id: uuidv4(),
            year: year,
            model_id: modelId,
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }

        // 4. Batch insert years safely with ignoreDuplicates enabled
        const chunkSize = 250;
        for (let i = 0; i < yearRecords.length; i += chunkSize) {
          const chunk = yearRecords.slice(i, i + chunkSize);
          await queryInterface.bulkInsert('CarModelYear', chunk, {
            ignoreDuplicates: true
          });
        }
      }
    }
  },

  async down(queryInterface, Sequelize) {
    // Revert inserted items if needed
    await queryInterface.bulkDelete('CarModelYear', null, {});
    await queryInterface.bulkDelete('CarModel', null, {});
  }
};
