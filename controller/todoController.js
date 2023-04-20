const Joi = require("joi");
const TODO = require("../model/todoModel");
const AppError = require("../utils/appError");
const catchAsync = require("../middleware/catchAsync");

module.exports.add = catchAsync(async (req, res, next) => {
  const todo = await TODO.create({
    email: req.user.email,
    title: req.body.title,
  });

  res.status(201).send(todo);
});

module.exports.update = catchAsync(async (req, res, next) => {
  if (!req.params.id) return next(new AppError("Provide ID", 400));
  const todoUpdate = await TODO.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
    },
    { new: true }
  );
  res.status(200).send(todoUpdate);
});

module.exports.delete = catchAsync(async (req, res, next) => {
  if (!req.params.id) return next(new AppError("Provide ID", 400));

  await TODO.findByIdAndDelete(req.params.id);
  res.status(201).send("");
});

module.exports.getAllTodos = catchAsync(async (req, res, next) => {
  const allTodos = await TODO.find();
  if (!allTodos) return next(new AppError("No Todos Found..!", 400));
  res.status(200).send(allTodos);
});

// Validator

module.exports.validateTODO = (todo) => {
  const schema = Joi.object({
    title: Joi.string().min(5).max(55),
  });
  const result = schema.validate(todo);
  return result.error;
};
