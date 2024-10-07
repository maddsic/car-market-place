const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();

const { authenticateDBConnection } = require("./db");
const authRouter = require("./api/authModule/authRoutes");
const userRouter = require("./api/userModule/userRoute");
const carRouter = require("./api/carModule/carRoute");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*", methods: "GET,POST,PUT,DELETE" }));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

authenticateDBConnection();

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/cars", carRouter);
// app.use((req, res, next) => {
//    res.send("it works");
// });

module.exports = app;
