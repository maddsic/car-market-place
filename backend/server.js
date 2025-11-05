const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");

// CONFIGURE ENV VARIABLES
dotenv.config();

// PORT
const port = process.env.SERVER_PORT || 3000;

// CREATE SERVER
const server = http.createServer(app);

server.listen(port, () => {
  console.log("Server running on port: " + port);
});
