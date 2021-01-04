const catchAsync = require('../../utilities/catchAsync');
const User = require('../../models/usersModel');
const hashToken = require('../../utilities/tokens/hashToken');
const AppError = require('../../utilities/AppError');
const createNsendToken = require('./jwt_facade/createNsendToken');

module.exports = catchAsync(async (req, res, next) => {
  //1. Get user based on the token
  const hashedToken = hashToken(req.params.token);
  //2. set new password if token has not expired and there is a user
  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  if (!user)
    return next(
      new AppError('Token is invalid or has expired. Please try again', 400)
    );
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  //4. log the user in, send signed JWT
  createNsendToken(res, 200, user);
});
