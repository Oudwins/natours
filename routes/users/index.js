const express = require('express');
const routes = require('../../helpers/requireModulesR')(__dirname);
// route = /api/v1/users
const router = express.Router();
// !Routes
router.route('/').get(routes.getUsers).post(routes.createUser);

router
  .route('/:id')
  .get(routes.getUser)
  .patch(routes.updateUser)
  .delete(routes.deleteUser);

module.exports = {
  resourceURL: '/api/v1/users',
  router,
};
