const express = require("express");
const { getUsers, getUserById, updateUser, deleteUser } = require("./userController");
const router = express.Router();

router.get("/:userId", getUserById);
router.get("/", getUsers);
router.put("/:userId", updateUser);
router.delete("/:userId", deleteUser);

module.exports = router;
