const Booking = require('../../models/bookingsModel');
const Tour = require('../../models/toursModel');
const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');

module.exports = catchAsync(async (req, res, next) => {
  //1) Find all booking
  const bookings = await Booking.find({
    user: req.user.id,
  });
  // 2) Find tours with returned Ids (or do a virtual populate)
  const tourIds = bookings.map((el) => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });
  // with virtual populate (need to add virtual property in our booking schema)
  res.status(200).render('overview', {
    title: 'My Tours',
    tours,
  });
});
