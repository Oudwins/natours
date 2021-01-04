const signToken = require('./signToken');

module.exports = (res, statusCode = 200, user) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    /* Set HTTPS only if in production */
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
  };
  res.cookie('jwt', token, cookieOptions);
  //3. log user in, send JWT
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
