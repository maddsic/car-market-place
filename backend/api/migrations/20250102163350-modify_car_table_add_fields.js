'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  // Add new columns to the 'Car' table
  async up(queryInterface, Sequelize) {
    // 1. Get the current table structure to check for existing columns
    const tableInfo = await queryInterface.describeTable('Car');

    // 2. Define the columns to add with their respective types and nullability
    const columnsToAdd = [
      { name: 'drive', type: Sequelize.STRING, allowNull: true },
      { name: 'int_color', type: Sequelize.STRING, allowNull: true },
      { name: 'ext_color', type: Sequelize.STRING, allowNull: false },
      { name: 'vin', type: Sequelize.STRING, allowNull: true },
      { name: 'location', type: Sequelize.STRING, allowNull: false },
      { name: 'lng', type: Sequelize.STRING, allowNull: true },
      { name: 'lat', type: Sequelize.STRING, allowNull: true },
      { name: 'air_condition', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'backup_camera', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'cruis_control', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'navigation', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'bluetooth', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'audio', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'stereo', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'dvd', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'airbag_passenger', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'airbag_driver', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'security_system', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'antilock', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'heated_seat', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'power_seat', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'bucket_seat', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'leather_seat', type: Sequelize.BOOLEAN, allowNull: true },
      { name: 'seller_note', type: Sequelize.STRING, allowNull: true },
    ];

    // 3. Sequentially add each column if it doesn't already exist
    for (const column of columnsToAdd) {
      if (!tableInfo[column.name]) {
        await queryInterface.addColumn('Car', column.name, {
          type: column.type,
          allowNull: column.allowNull,
        })
      }
    }

  },

  // Revert the changes made in the 'up' method
  async down(queryInterface, Sequelize) {
    //  1. Get the current table structure to check for existing columns
    const tableInfo = await queryInterface.describeTable('Car');

    // 2. Define the columns to remove
    const columnsToRemove = [
      'drive', 'int_color', 'ext_color', 'vin', 'location', 'lng', 'lat',
      'air_condition', 'backup_camera', 'cruis_control', 'navigation', 'bluetooth',
      'audio', 'stereo', 'dvd', 'airbag_passenger', 'airbag_driver', 'security_system',
      'antilock', 'heated_seat', 'power_seat', 'bucket_seat', 'leather_seat', 'seller_note'
    ];
    // 3. Sequentially remove each column if it exists
    for (const columnName of columnsToRemove) {
      if (tableInfo[columnName]) {
        await queryInterface.removeColumn('Car', columnName);
      }
    }
  },
};
