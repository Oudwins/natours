const express = require('express');
const controller = require('../controllers/tours');

const router = express.Router();
//Importing middleware
const checkID = require('../controllers/tours/helpers/checkID');
const checkBody = require('../controllers/tours/helpers/checkBody');
// !Route middleware
router.param(checkID.param, checkID.fn);

// !ROUTES
router
  .route('/')
  .get(controller.getTours)
  .post(checkBody, controller.createTour);

router
  .route('/:id')
  .get(controller.getTour)
  .patch(controller.updateTour)
  .delete(controller.deleteTour);

module.exports = {
  resourceURL: '/api/v1/tours',
  router,
};
