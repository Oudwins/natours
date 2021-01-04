const AppError = require('../../../utilities/AppError');

module.exports = (err) => {
  const message = `invalid ${err.path}: ${err.value}`;
  return new AppError(message, 400);
};
