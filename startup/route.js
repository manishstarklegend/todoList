const express = require("express");
const userRoute = require("../routes/userRoute");
const todoRoute = require("../routes/todoRoute");
const error = require("../middleware/error");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.status(200).render("base");
  });

  app.use(express.json());

  app.use("/api/user", userRoute);
  app.use("/api/todo", todoRoute);
  app.use("*", (req, res) => {
    res.status(404).send("no routes found..!");
  });
  app.use(error);
};
