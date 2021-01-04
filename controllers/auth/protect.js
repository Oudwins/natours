const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');
const verifyToken = require('./jwt_facade/varifyToken');
const User = require('../../models/usersModel');

// this is a middlware function that protects routes so that only logged in users can see them.
module.exports = catchAsync(async (req, res, next) => {
  // 1) get token from req.body
  let token = null;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies.jwt) {
    // USER NOT USING API BUT BROWSER
    token = req.cookies.jwt;
  }

  // 2) check if token exists
  if (!token)
    return next(new AppError('You are not logged in. Please login', 401));
  // 3) check if token is valid, if some1 manipulated data || token expired
  const decoded = await verifyToken(token);
  // 4) check if user who is trying to access route still exists
  const user = await User.findById(decoded.id);
  if (!user)
    return next(
      new AppError('The user belonging to the token no longer exists'),
      401
    );
  // 5) check if said user changed his password after the token was created.
  if (user.changedPasswordAfter(decoded.iat))
    return next(
      new AppError('User recently changed password! Please log in again.'),
      401
    );
  // ! grant access to protected route;
  // this is used for our template engine (rendering)
  if (!req.originalUrl.startsWith('/api')) res.locals.user = user;
  req.user = user;
  next();
});
