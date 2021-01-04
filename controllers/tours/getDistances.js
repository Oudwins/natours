const Tour = require('../../models/toursModel');
const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');

module.exports = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  console.log(lat, lng, unit);
  // create new error;
  if (!lat || !lng)
    return next(
      new AppError(
        'Please provide latitude and longitude in the format lat,long.',
        400
      )
    );
  if (unit !== 'ml' && unit !== 'km')
    return next(
      new AppError('invalid parameter. Unit may only be "km" or "ml"', 400)
    );
  //
  const multiplier = unit === 'ml' ? 0.00062137119 : 0.001;
  // mongoDB expects the radious of the earth!
  const distances = await Tour.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [lng * 1, lat * 1],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        name: 1,
      },
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
