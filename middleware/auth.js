const JWT = require("jsonwebtoken");
const AppError = require("../utils/appError");
const User = require("../model/userModel");

module.exports = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token) return next(new AppError("Unathorized..!", 401));
  try {
    const decode = JWT.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findOne({ email: decode.email });
    if (!user) return next(new AppError("No User found..", 400));
    user.password = undefined;
    req.user = user;
    next();
  } catch (err) {
    next(new AppError("Unauthorized.!", 401));
  }
};
