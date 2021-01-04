const express = require('express');
const controller = require('../controllers/tours');
const { protect, restrictTo } = require('../controllers/auth');
const middleware = require('../controllers/tours/middleware');
/* !THIS SHOULD BE IN OTHER RESOURCE */
const reviewRouter = require('./reviews');

const router = express.Router();
// !Route middleware

//! nested routes
router.use(reviewRouter.nestedTourURL, reviewRouter.router);

// !ROUTES
// SPECIAL ROUTES
router.route('/top-5').get(middleware.aliasTopTours, controller.getTours);
// stat routes
router.route('/stats').get(controller.getStats);
router
  .route('/monthly-plan/:year')
  .get(
    protect,
    restrictTo('admin', 'lead-guide', 'guide'),
    controller.getMonthlyPlan
  );
// provides tours within x km from location
router
  .route('/within/:distance/center/:latlng/unit/:unit')
  .get(controller.getToursWithin);
// provides distance from location to start location of all tours
router.route('/distances/:latlng/unit/:unit').get(controller.getDistances);

// NORMAL ROUTES
router
  .route('/')
  .get(controller.getTours)
  .post(protect, restrictTo('lead-guide', 'admin'), controller.createTour);

router
  .route('/:id')
  .get(controller.getTour)
  .patch(
    protect,
    restrictTo('admin', 'lead-guide'),
    middleware.uploadTourImages,
    middleware.resizeTourImages,
    controller.updateTour
  )
  .delete(protect, restrictTo('admin', 'lead-guide'), controller.deleteTour);

/* ! this should be in review controller */
module.exports = {
  resourceURL: '/api/v1/tours',
  router,
};
