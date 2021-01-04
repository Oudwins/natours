const User = require('../../models/usersModel');
const catchAsync = require('../../utilities/catchAsync');
const createNsendToken = require('./jwt_facade/createNsendToken');
const Email = require('../../utilities/email');

module.exports = catchAsync(async (req, res, next) => {
  const {
    name,
    email,
    password,
    passwordConfirm,
    photo,
    /* DEV PROPERTIES */
    passwordChangedAt,
    role,
  } = req.body;
  const newUser = await User.create({
    name,
    email,
    password,
    passwordConfirm,
    photo: photo || undefined,
    passwordChangedAt:
      process.env.NODE_ENV !== 'development' ? undefined : passwordChangedAt,
    role: process.env.NODE_ENV !== 'development' ? 'user' : role,
  });
  const url = `${req.protocol}://${req.get('host')}/me`;
  console.log(url);
  await new Email(newUser, url).sendWelcome();
  createNsendToken(res, 201, newUser);
});
