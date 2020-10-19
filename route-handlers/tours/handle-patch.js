const tours = require('../../preloads/tours');
const helpers = require('./helpers/helpers');

const updateTour = (req, res) => {
  // checking if id is available
  if (!helpers.verifyID(req.params.id)) return helpers.invalidID(res);

  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};

module.exports = {
  updateTour,
};
