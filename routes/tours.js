const express = require('express');
const controller = require('../controllers/tours');

const router = express.Router();
//Importing middleware
// !Route middleware

// !ROUTES
router.route('/').get(controller.getTours).post(controller.createTour);

router
  .route('/:id')
  .get(controller.getTour)
  .patch(controller.updateTour)
  .delete(controller.deleteTour);

module.exports = {
  resourceURL: '/api/v1/tours',
  router,
};
