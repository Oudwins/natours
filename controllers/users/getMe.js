module.exports = (req, res, next) => {
  req.params.id = req.user.id;
  console.log(req.params);
  next();
};
