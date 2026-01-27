const express = require("express");
const { getUsers, getUserById, updateUser, deleteUser } = require("./userController");
const { checkAuth } = require("../middlewares/verifyToken");
const router = express.Router();

router.get("/:userId", getUserById);
router.get("/", getUsers);
router.put("/:userId", checkAuth, updateUser);
router.delete("/:userId", checkAuth, deleteUser);

module.exports = router;
