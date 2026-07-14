// CONFIGURE ENV VARIABLES
const dotenv = require('dotenv');
dotenv.config();

console.log('NODE_ENV:', process.env.NODE_ENV);
console.log('MYSQLHOST:', process.env.MYSQLHOST);
console.log('MYSQLDATABASE:', process.env.MYSQLDATABASE);

const http = require('http');
const app = require('./app');


// PORT
const port = process.env.SERVER_PORT || 3000;

// DATABASE CONNECTION
const { authenticateDBConnection } = require('./db');

// AUTHENTICATE DB AND START SERVER
authenticateDBConnection().then(() => {
  // CREATE SERVER
  const server = http.createServer(app);
  server.listen(port, () => {
    console.log('Server running on port: ' + port);
  });
}).catch(err => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
