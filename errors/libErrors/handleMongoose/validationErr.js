const AppError = require('../../../utilities/AppError');

module.exports = (err) => {
  const errors = Object.values(err.errors)
    .map((el) => el.message)
    .join(', ');
  const message = `Invalid Input data. Please solve the following errors: /${errors}/`;
  return new AppError(message, 400);
};
