const express = require("express");
const TODO = require("../controller/todoController");
const auth = require("../middleware/auth");
const validator = require("../middleware/validator");
const validateObjectId = require("../middleware/validateObjectId");

const router = express.Router();

router.get("/", auth, TODO.getAllTodos);
router.post("/add", auth, validator(TODO.validateTODO), TODO.add);
router.patch("/:id", [auth, validateObjectId], TODO.update);
router.delete("/:id", [auth, validateObjectId], TODO.delete);

module.exports = router;
