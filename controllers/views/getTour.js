const Tour = require('../../models/toursModel');
const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');

module.exports = catchAsync(async (req, res, next) => {
  // 1 get the data for the requested tour (slug). We need the tour, reviews and tour guides. Populate the reviews.
  const tour = await Tour.find({ slug: req.params.slug }).populate({
    path: 'reviews',
    options: { limit: 20 },
  });
  // 2) build template
  if (!tour[0]) {
    return next(new AppError('There is no tour with that name', 404));
  }
  // 3) render template using the data from step 1
  res.status(200).render('tour', {
    title: `${tour[0].name} Tour`,
    tour: tour[0],
  });
});
