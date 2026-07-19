const db = require('./api/models');

console.log('db object loaded:', !!db);
console.log('db.sequelize exists:', !!db.sequelize);

exports.authenticateDBConnection = async () => {
  try {
    console.log('Attempting to authenticate...');
    await db.sequelize.authenticate();
    console.log('Database Connection has been established successfully');
  } catch (err) {
    console.log('Unable to connect to database: ' + err.message);
    // console.log('Full error:', err);
  }
};
