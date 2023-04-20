const AppError = require("../utils/appError");
module.exports = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (err) {
      next(new AppError(err.message, 400));
    }
  };
};
