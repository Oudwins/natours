const verifyID = require('./helpers/id_validation/verifyID');
const invalidID = require('./helpers/id_validation/invalidID');
const tours = require('../../preloads/tours');
module.exports = (req, res) => {
  const id = verifyID(req.params.id);
  if (!id) return invalidID(res);
  const tour = tours.find((el) => el.id === id);
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
};
