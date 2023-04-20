const mongoose = require("mongoose");

mongoose
  .connect("mongodb://0.0.0.0:27017/todoList")
  .then(() => console.log("Databse connected"))
  .catch((err) => console.error(err));
