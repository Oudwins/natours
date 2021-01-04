const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');
const User = require('../../models/usersModel');
const createNsendToken = require('./jwt_facade/createNsendToken');

module.exports = catchAsync(async (req, res, next) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
});
