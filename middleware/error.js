const winston = require("winston");
module.exports = (err, req, res, next) => {
  winston.error(err.message);
  const statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.message);
};
