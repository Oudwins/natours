const catchAsync = require('../../utilities/catchAsync');
const User = require('../../models/usersModel');
const AppError = require('../../utilities/AppError');
const Email = require('../../utilities/email');

module.exports = catchAsync(async (req, res, next) => {
  //1. Get user based on POSTED email
  const user = await User.findOne({ email: req.body.email });
  // THIS MIGHT ACTUALLY BE WRONG, SINCE IT IS A WAY TO TELL AN ATTACKER THAT YOU HAVE OR DONT HAVE AN EMAIL ON YOUR DB. IT IS PROBABLY BETTER TO JUST SAY "AN EMAIL WAS SEND IF WE HAVE YOU ON RECORD".
  if (!user)
    return next(new AppError('There is no user with that email address.', 404));
  //2. generate random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });
  //3. send it back as an email

  try {
    const resetUrl = `${req.protocol}://${req.get(
      'host'
    )}/api/v1/users/resetpassword/${resetToken}`;
    await new Email(user, resetUrl).sendPasswordReset();
    res.status(200).json({
      status: 'success',
      message: 'Email was sent successfully',
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    /*     return next(
      new AppError('There was an error sending the email, try again later', 500)
    ); */
    return next(new AppError(err, 500));
  }
});
