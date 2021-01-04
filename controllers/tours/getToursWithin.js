const Tour = require('../../models/toursModel');
const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');
// Calculates all tours that start X km or miles from location
module.exports = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');
  console.log(distance, lat, lng, unit);
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
  // mongoDB expects the radious of the earth!
  const radius = unit === 'ml' ? distance / 3963.2 : distance / 6378.1;
  const tours = await Tour.find({
    startLocation: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      data: tours,
    },
  });
});

/* '/tours-within/:distance/center/:latlng/unit/:uniit' */
