const express = require('express');
const routes = require('../../helpers/requireModulesR')(__dirname);
// Route /api/v1/tours
const router = express.Router();

router.route('/').get(routes.getTours).post(routes.createTour);

router
  .route('/:id')
  .get(routes.getTour)
  .patch(routes.updateTour)
  .delete(routes.deleteTour);

module.exports = {
  resourceURL: '/api/v1/tours',
  router,
};
