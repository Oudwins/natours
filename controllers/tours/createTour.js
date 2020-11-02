const Tour = require('../../models/toursModel');

module.exports = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    // try to create invalid tour. Promise rejected
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
