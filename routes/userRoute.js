const express = require("express");
const User = require("../controller/userController");
const validator = require("../middleware/validator");
const router = express.Router();

router.post("/insert_user", validator(User.validateUser), User.createUser);
router.post("/login", validator(User.validateLogin), User.login);
module.exports = router;
