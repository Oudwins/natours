module.exports = (req, res, next) => {
  // Ensures post requests have name and price
  if (!req.body.price || !req.body.name) {
    return res.status(400).json({
      status: 'Bad Request',
      message: 'Missing name or price fields.',
    });
  }
  next();
};
