const User = require("../model/userModel");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const AppError = require("../utils/appError");
const JWT = require("jsonwebtoken");

module.exports.createUser = async (req, res, next) => {
  const password = await bcrypt.hash(req.body.password, 12);

  const user = await User.create({
    name: req.body.name,
    email: req.body.email,
    password,
  });
  res.status(200).send(user);
};

module.exports.login = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new AppError("No User Found..!", 400));
  const password = req.body.password;

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return next(new AppError("Password did not match", 400));
  user.password = undefined;
  const token = generateToken(user.email);

  res.status(200).json({
    status: 200,
    message: "success",
    token,
  });
};
// Validation

module.exports.validateUser = (user) => {
  const schema = Joi.object({
    name: Joi.string().min(5).max(55).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(5).max(100).required(),
  });
  const result = schema.validate(user);
  return result.error;
};

module.exports.validateLogin = (user) => {
  const schema = Joi.object({
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    password: Joi.string().min(5).max(100).required(),
  });
  const result = schema.validate(user);
  return result.error;
};

function generateToken(email) {
  return JWT.sign({ email }, process.env.JWT_SECRET_KEY);
}
