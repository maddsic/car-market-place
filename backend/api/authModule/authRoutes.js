const express = require("express");
const router = express.Router();
const models = require("../models");

const AuthController = require("./authController");
const AuthService = require("./authService");
const AuthRepository = require("./authRepository");

const authRepository = new AuthRepository(models);
const authService = new AuthService(authRepository);
const authController = new AuthController(authService);

router.post("/register", authController.register);
router.post("/login", authController.login);

module.exports = router;
