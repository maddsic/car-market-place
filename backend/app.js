const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const errorHandler = require("./globalError");
require("dotenv").config();

const { authenticateDBConnection } = require("./db");
const authRouter = require("./api/authModule/authRoutes");
const userRouter = require("./api/userModule/userRoute");
const carRouter = require("./api/carModule/carRoute");

const app = express();

app.use(express.json());
app.use(cors({ origin: "https://pumped-polliwog-fast.ngrok-free.app", methods: "GET,POST,PUT,DELETE" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

authenticateDBConnection();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cars", carRouter);

// GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
   console.log(err.stack);

   return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message || "Internal server error",
   });
});

module.exports = app;
