module.exports = (req, res, next) => {
  req.query.sort = '-ratingsAverage,price';
  req.query.limit = '5';
  /* req.query.fields = 'name,price,ratingsAverage,summary,difficulty'; */
  next();
};
