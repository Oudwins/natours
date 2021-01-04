const express = require('express');
const controller = require('../../controllers/views');
const middleware = require('../../controllers/views/middleware');
const { protect, isLoggedIn } = require('../../controllers/auth');
const { createBookingCheckout } = require('../../controllers/bookings');

const router = express.Router();
// !APP
router.get('/', createBookingCheckout, isLoggedIn, controller.getOverview);
router.get('/tour/:slug', isLoggedIn, controller.getTour);
//! User
router.get('/me', protect, controller.getAccount);

router.get('/my-tours', protect, controller.getMyTours);
// !Auth
router.get('/login', controller.getLoginPage);

module.exports = {
  url: '/',
  router,
};
