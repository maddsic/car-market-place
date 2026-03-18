const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/verifyToken");

const UserRepository = require("./userRepository");
const UserService = require("./userService");
const UserController = require("./userController");

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

router.get("/:userId", userController.getUserById);
router.get("/", userController.getAllUsers);
router.put("/:userId", checkAuth, userController.updateUser);
router.delete("/:userId", checkAuth, userController.deleteUser);

module.exports = router;
