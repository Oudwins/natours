module.exports = (req, res, next) => {
  res.status(404).json({
    status: 'fail',
    message: 'this route is not defined please use sign up instead',
  });
};
