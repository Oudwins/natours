const express = require('express');
const controller = require('../controllers/bookings');
const { protect, restrictTo } = require('../controllers/auth');

const router = express.Router();

// BOOKINGS DEAL WITH LOGGED IN USERS
router.use(protect);

router.get('/checkout-session/:tourId', controller.getCheckoutSession);

// !CRUD ROUTES (Create Read Update Delete)
// these are admin only routes
router.use(restrictTo('admin'));

router.route('/').get(controller.getAllBookings).post(controller.createBooking);

router
  .route('/:id')
  .get(controller.getBooking)
  .patch(controller.updateBooking)
  .delete(controller.deleteBooking);

module.exports = {
  resourceURL: '/api/v1/bookings',
  router,
};
