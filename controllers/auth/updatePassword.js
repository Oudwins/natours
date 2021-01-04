const catchAsync = require('../../utilities/catchAsync');
const User = require('../../models/usersModel');
const AppError = require('../../utilities/AppError');
const createNsendToken = require('./jwt_facade/createNsendToken');

module.exports = catchAsync(async (req, res, next) => {
  //1. Get user
  const user = await User.findById(req.user.id).select('+password');
  //2. Bcrypt verify oldPassword
  if (!user || !(await user.correctPassword(req.body.password, user.password)))
    return next(new AppError('Password you entered is wrong', 403));

  //3. update password
  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createNsendToken(res, 200, user);
});
