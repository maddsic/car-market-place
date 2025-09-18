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

const allowedOrigins = [
  "https://pumped-polliwog-fast.ngrok-free.app",
  "https://car-market-place-five.vercel.app/",
  "http://localhost:8080",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    }
  },
};
// MIDDLEWARES 3
app.use(
  cors(corsOptions, {
    methods: "GET,POST,PUT,DELETE",
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("combined", { stream: accessLogSream }));
app.use(helmet());

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
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
