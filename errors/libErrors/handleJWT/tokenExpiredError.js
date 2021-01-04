const AppError = require('../../../utilities/AppError');

module.exports = () =>
  new AppError('Your token has expired, please login again.', 401);
