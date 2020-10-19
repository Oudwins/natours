const tours = require('../../preloads/tours');
const helpers = require('./helpers/helpers');
const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours,
    },
  });
};

const getTour = (req, res) => {
  const id = helpers.verifyID(req.params.id);
  if (!id) return helpers.invalidID(res);
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};

module.exports = {
  getTour,
  getTours,
};
