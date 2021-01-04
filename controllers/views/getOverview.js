const Tour = require('../../models/toursModel');
const catchAsync = require('../../utilities/catchAsync');

module.exports = catchAsync(async (req, res, next) => {
  // 1) Get Tour data from collection
  const tours = await Tour.find({}).limit(10);
  // 2) Build template
  // 3) render template using tour data
  res.status(200).render('overview', {
    title: 'Exciting tours for adventurous people',
    tours,
  });
});
