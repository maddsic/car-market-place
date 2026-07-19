// CONFIGURE ENV VARIABLES
const dotenv = require('dotenv');
dotenv.config();

const http = require('http');
const app = require('./app');

// PORT
const port = process.env.SERVER_PORT || 3000;

// DATABASE CONNECTION
// Import your model definitions alongside your connection logic
const { authenticateDBConnection } = require('./db');
const { sequelize } = require('./api/models'); // Make sure this path correctly points to your models folder

// AUTHENTICATE DB AND START SERVER
authenticateDBConnection()
  .then(() => {
    console.log('Database connected successfully. Syncing tables...');
    // This creates missing tables automatically based on your model definitions
    return sequelize.sync(); // Set force to true if you want to drop and recreate tables (use with caution)
  })
  .then(() => {
    console.log('Database tables verified/synced successfully.');

    // CREATE SERVER
    const server = http.createServer(app);
    server.listen(port, () => {
      console.log('Server running on port: ' + port);
    });
  })
  .catch(err => {
    console.error('Failed to start server:', err);
    process.exit(1);
  });
