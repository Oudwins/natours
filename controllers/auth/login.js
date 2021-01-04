const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');
const User = require('../../models/usersModel');
const createNsendToken = require('./jwt_facade/createNsendToken');

module.exports = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // 1) Check if email & password exist
  if (!email || !password)
    return next(
      new AppError('Please provide email and password to login', 400)
    );

  // 2) check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');
  //3) if all is ok, send jwt to client.
  // if user does not exist error, if password is wrong, error, else success
  if (!user || !(await user.correctPassword(password, user.password)))
    return next(new AppError('Email or password is incorrect.', 401));
  createNsendToken(res, 200, user);
});
