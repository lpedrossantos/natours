const express = require('express');
const viewController = require('./../controlers/viewController');
const authController = require('./../controlers/authController');
const bookingController = require('./../controlers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedIn,
  viewController.getOverview
);

router.get(
  '/tour/:slug',
  authController.isLoggedIn,
  viewController.getTour({ path: 'reviews', fields: 'review rating user' })
);

router.get('/login', authController.isLoggedIn, viewController.getLoginForm);

router.get('/me', authController.protect, viewController.getAccount);

router.get('/my-tours', authController.protect, viewController.getMyTours);

/*router.post(
  '/submit-user-data',
  authController.protect,
  viewController.updateUserData
);*/

module.exports = router;
