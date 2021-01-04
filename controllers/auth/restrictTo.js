const AppError = require('../../utilities/AppError');

module.exports = (...roles) => {
  // roles is an array we can access because of closure.
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(
        new AppError('You are not authorized to perform this action', 403)
      );
    next();
  };
};
