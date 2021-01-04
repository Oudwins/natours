const express = require('express');
const controller = require('../controllers/reviews');
// middleware
const setParamOnBody = require('../controllers/globalMiddleware/setParamOnBody');
const setParamToFilterObj = require('../controllers/globalMiddleware/setParamToFilterObj');
const { protect, restrictTo } = require('../controllers/auth');

const router = express.Router({
  mergeParams: true,
});

router.use(protect);

// routes
router
  .route('/')
  .get(
    setParamOnBody('tourId', 'tour'),
    setParamToFilterObj('tourId', 'tour'),
    controller.getReviews
  )
  .post(
    restrictTo('user'),
    setParamOnBody('tourId', 'tour'),
    setParamToFilterObj('tourId', 'tour'),
    controller.createReview
  );

// ! needs auth
router
  .route('/:id')
  .get(controller.getReview)
  .delete(restrictTo('user', 'admin'), controller.deleteReview)
  .patch(restrictTo('user', 'admin'), controller.updateReview);

module.exports = {
  resourceURL: '/api/v1/reviews',
  nestedTourURL: '/:tourId/reviews',
  router,
};
