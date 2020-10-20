const express = require('express');
const controller = require('../controllers/users');

const router = express.Router();
// !Routes
router.route('/').get(controller.getUsers).post(controller.createUser);

router
  .route('/:id')
  .get(controller.getUser)
  .patch(controller.updateUser)
  .delete(controller.deleteUser);

module.exports = {
  resourceURL: '/api/v1/users',
  router,
};
