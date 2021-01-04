const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET_KEY);
const Tour = require('../../models/toursModel');
const catchAsync = require('../../utilities/catchAsync');
const AppError = require('../../utilities/AppError');

module.exports = catchAsync(async (req, res, next) => {
  // 1) get currently booked tour (from req.params.tourId) req
  const tour = await Tour.findById(req.params.tourId);

  if (!tour)
    return next(
      new AppError('Tour not found. You cannot continue with purchase', 404)
    );
  // 2) Create checkout session
  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${tour.id}&price=${
      tour.price
    }&user=${req.user.id}`,
    cancel_url: `${req.protocol}://${req.get('host')}/tour/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: req.params.tourId,
    line_items: [
      {
        name: `${tour.name} Tour`,
        description: tour.summary,
        // arr images must be hosted (so website must be hosted)
        /* images: */
        amount: tour.price * 100,
        currency: 'usd',
        quantity: 1,
      },
    ],
  });
  // 3) send it to the client as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
