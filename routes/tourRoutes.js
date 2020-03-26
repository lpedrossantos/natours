const express = require('express');
const tourControler = require('./../controlers/tourControler');
const authController = require('./../controlers/authController');
const reviewRouter = require('./../routes/reviewRoutes');

const router = express.Router();

//router.param('id', tourControler.checkID);

//POST /tour/234fad4/reviews => nested route
//GET /tour/234fad4/reviews

router.use('/:tourId/reviews', reviewRouter);

router
  .route('/top-5-cheap')
  .get(tourControler.aliasTopTours, tourControler.getAllTours);

router.route('/tour-stats').get(tourControler.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide', 'guide'),
    tourControler.getMonthlyPlan
  );
router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(tourControler.getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(tourControler.getDistances);

router
  .route('/')
  .get(tourControler.getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('lead-guide', 'admin'),
    tourControler.createTour
  );

router
  .route('/:id')
  .get(tourControler.getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourControler.uploadTourImages,
    tourControler.resizeTourImages,
    tourControler.updateTour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    tourControler.deleteTour
  );

module.exports = router;
