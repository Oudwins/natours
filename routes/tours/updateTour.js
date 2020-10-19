const verifyID = require('./helpers/id_validation/verifyID');
const invalidID = require('./helpers/id_validation/invalidID');
const tours = require('../../preloads/tours');
module.exports = (req, res) => {
  // checking if id is available
  if (!verifyID(req.params.id)) return invalidID(res);
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};
