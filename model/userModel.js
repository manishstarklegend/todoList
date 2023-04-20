const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 5,
    maxlength: 55,
    required: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 55,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    minlength: 5,
    maxlength: 100,
    required: true,
  },
});

const User = mongoose.model("users", userSchema);

module.exports = User;
