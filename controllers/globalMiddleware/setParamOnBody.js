module.exports = (param, bodyKey) => {
  return (req, res, next) => {
    // allow nested routes
    if (!req.body[bodyKey]) req.body[bodyKey] = req.params[param];
    next();
  };
};
