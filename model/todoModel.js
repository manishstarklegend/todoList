const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    maxlength: 55,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

const TODO = mongoose.model("todo", todoSchema);

module.exports = TODO;
