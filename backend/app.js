const express = require("express");
const app = express();
const fs = require("fs");
const path = require("path");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./docs/swagger.yaml");

// ---------------------------------------------
// INITIALIZING .ENV VARIABLES
// ---------------------------------------------
require("dotenv").config();

// ---------------------------------------------
// INITIALIZING DB AND MODELS
// ---------------------------------------------
const { authenticateDBConnection } = require("./db");

// ---------------------------------------------
// IMPORTING ROUTES
// ---------------------------------------------
const authRouter = require("./api/authModule/authRoutes");
const userRouter = require("./api/userModule/userRoute");
const carRouter = require("./api/carModule/carRoute");
const dealerRouter = require("./api/dealerModule/dealerRoute");
const reviewRouter = require("./api/reviewModule/reviewRoute");

// ---------------------------------------------
// LOGGING SETUP
// ---------------------------------------------
const accessLogSream = fs.createWriteStream(
  path.join(__dirname, "access.logs"),
  { flags: "a" }
);

// ---------------------------------------------
// MIDDLEWARES
// ---------------------------------------------
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: accessLogSream }));
app.use(helmet());

// ---------------------------------------------
// LOGGING EACH REQUEST (HELPS WITH DEBUGGING)
// ---------------------------------------------
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// ---------------------------------------------
// DATABASE CONNECTION
// ---------------------------------------------
authenticateDBConnection();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cars", carRouter);
app.use("/api/v1/dealers", dealerRouter);
app.use("/api/v1/reviews", reviewRouter);

// ---------------------------------------------
// GLOBAL ERROR HANDLER
// ---------------------------------------------
app.use((err, req, res, next) => {
  console.log("ERROR FROM GLOBAL ERROR HANDLER");
  console.log(err.stack.message);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message || "Internal server error",
  });
});

module.exports = app;
