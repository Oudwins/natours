const AppError = require('../../../utilities/AppError');

module.exports = () => new AppError('Invalid token please login again.', 401);
