const verifyToken = require('./jwt_facade/varifyToken');
const User = require('../../models/usersModel');

// ONLY FOR RENDERED PAGES -> WILL BE NO ERROR
module.exports = async (req, res, next) => {
  try {
    // 1) get token from req.body
    let token = null;
    if (req.cookies.jwt) {
      token = req.cookies.jwt;
      // 1) verify token
      const decoded = await verifyToken(token);
      // 4) check if user who is trying to access route still exists
      const user = await User.findById(decoded.id);
      if (!user) return next();
      // 5) check if said user changed his password after the token was created.
      if (user.changedPasswordAfter(decoded.iat)) return next();
      // ! THERE IS A LOGGED IN USER (that is available)
      res.locals.user = user;
    }
    return next();
  } catch (e) {
    return next();
  }
};
