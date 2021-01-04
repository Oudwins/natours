const express = require('express');
const userController = require('../controllers/users');
const middleware = require('../controllers/users/middleware');
const setPropertyIdToFilterObj = require('../controllers/globalMiddleware/setPropertyIdToFilterObj');
const authController = require('../controllers/auth');

const router = express.Router();
//! UNPROTECTED ROUTES (not need to be logged in)
// Auth Routes
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
// Password
router.post('/forgotPassword', authController.forgotPassword);

router.patch('/resetPassword/:token', authController.resetPassword);

//! Protected routes (need to be logged in)
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

// !Routes (rest format)
// PLAIN USER ROUTES
router.patch(
  '/updateMe',
  middleware.uploadUserPhoto,
  middleware.resizeAndSaveUserPhoto,
  userController.updateMe
);
router.delete('/deleteMe', userController.deleteMe);
router.get('/me', userController.getMe, userController.getUser);

router.get(
  '/my-bookings',
  setPropertyIdToFilterObj('user'),
  userController.getMyBookings
);

//! ADMIN ONLY ROUTES
router.use(authController.restrictTo('admin'));
router.route('/').get(userController.getUsers).post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = {
  resourceURL: '/api/v1/users',
  router,
};
