const verifyID = require('./verifyID');
const invalidID = require('./invalidID');
const fn = (req, res, next, val) => {
  const id = verifyID(val);
  if (!id) return invalidID(res);
  req.URLid = id;
  next();
};

module.exports = {
  param: 'id',
  fn,
};
