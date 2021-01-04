const Booking = require('../../models/bookingsModel');
const catchAsync = require('../../utilities/catchAsync');
/* const AppError = require('../../utilities/AppError');
 */

module.exports = catchAsync(async (req, res, next) => {
  // this is temporary, its unsecure, everyone can make bookings without paying
  const { tour, user, price } = req.query;
  if (!tour || !user || !price) return next();

  /* const booking =  */ await Booking.create({ tour, user, price });

  res.redirect(req.originalUrl.split('?')[0]);
});
