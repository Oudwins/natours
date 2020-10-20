const tours = require('./preloads/tours');
////////////////////////////////
module.exports = (req, res) => {
  res.status(204).json({
    status: 'success',
    data: null,
  });
};
