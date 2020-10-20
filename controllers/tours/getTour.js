const tours = require('./preloads/tours');

module.exports = (req, res) => {
  const tour = tours.find((el) => el.id === req.URLid);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
