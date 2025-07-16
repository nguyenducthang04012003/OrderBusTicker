const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/", userController.createUser); // Tạo user
router.get("/", userController.getAllUsers); // Lấy tất cả
router.get("/:phone", userController.getUserByPhone); // Tìm theo sđt

module.exports = router;
