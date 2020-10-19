const tours = require('../../preloads/tours');
const deleteTour = (req, res) => {
  const id = parseInt(req.params.id);
  // checking if id is available
  if (id > tours.length)
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });

  res.status(204).json({
    status: 'success',
    data: null,
  });
};

module.exports = {
  deleteTour,
};
