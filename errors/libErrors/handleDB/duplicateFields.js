const AppError = require('../../../utilities/AppError');

module.exports = (err) => {
  const duplicates = Object.entries(err.keyValue)
    .map((el) => el.join(': '))
    .join(', ');
  const message = `Duplicate field/s value/s: /${duplicates}/. Please use another value`;
  return new AppError(message, 400);
};
