const express = require('express');
const bookingController = require('./../controlers/bookingController');
const authController = require('./../controlers/authController');

const router = express.Router();

router.get(
  '/checkout-session/:tourId',
  authController.protect,
  bookingController.getCheckoutSession
);
router.use(
  authController.protect,
  authController.restrictTo('lead-guide', 'admin')
);
router
  .route('/')
  .get(bookingController.getAllBookings)
  .post(bookingController.createBooking);

router
  .route('/:id')
  .get(bookingController.getBooking)
  .patch(bookingController.updateBooking)
  .delete(bookingController.deleteBooking);

module.exports = router;
