const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const morgan = require("morgan");
const helmet = require("helmet");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const { authenticateDBConnection } = require("./db");

// IMPORTING ROUTES
const authRouter = require("./api/authModule/authRoutes");
const userRouter = require("./api/userModule/userRoute");
const carRouter = require("./api/carModule/carRoute");
const accessLogSream = fs.createWriteStream(
  path.join(__dirname, "accessLogs"),
  {
    flags: "a",
  }
);

// INITIALIZING OUR APP
const app = express();

// MIDDLEWARES

app.use(helmet.xssFilter());
app.use(express.json());
app.use(
  cors({
    origin: "https://pumped-polliwog-fast.ngrok-free.app",
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: accessLogSream }));
app.use(helmet());

app.use((req, res, next) => {
  console.log(
    `[${new Date().toISOString()}] User ${req.user} ${req.user} accessed ${
      req.method
    } ${req.originalUrl} `
  );

  next();
});

// DATABASE CONNECTION
authenticateDBConnection();

// USING ROUTES
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cars", carRouter);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
  console.log("ERROR FROM GLOBAL ERROR HANDLER");
  console.log(err.stack);

  return res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message || "Internal server error",
  });
});

module.exports = app;
