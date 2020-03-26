const Tour = require('../models/tourModel');
const User = require('../models/userModel');
const Booking = require('../models/bookingModel');
const multer = require('multer');
//const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
exports.getOverview = catchAsync(async (req, res, next) => {
  //1) Get Tour data from collection
  const tours = await Tour.find();

  //2) Build template

  //3) Render that template using tour data from 1)

  res.status(200).render('overview', {
    title: 'All Tours',
    tours
  });
});

exports.getTour = popOptions => {
  return catchAsync(async (req, res, next) => {
    // 1) get the data from the requested tour (including reviews and tour guides)
    const { slug } = req.params;
    let tour = await Tour.findOne({ slug }).populate(popOptions);

    if (!tour) {
      return next(new AppError('There is no tour with that name.', 404));
    }

    //2) Build template
    //3) Render template using the data from 1)
    res.status(200).render('tour', {
      title: tour.name,
      tour
    });
  });
};

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account'
  });
};

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account'
  });
};

exports.getMyTours = catchAsync(async (req, res, next) => {
  //1) Find all bookings
  const bookings = await Booking.find({ user: req.user.id });

  //2) Find Tours with the returned IDs
  const tourIds = bookings.map(el => el.tour);
  const tours = await Tour.find({ _id: { $in: tourIds } });

  res.status(200).render('overview', {
    title: 'My Tours',
    tours
  });
});

/*exports.updateUserData = catchAsync(async (req, res, next) => {
  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      name: req.body.name,
      email: req.body.email
    },
    {
      new: true,
      runValidators: true
    }
  );

  res.status(200).render('account', {
    title: 'Your account',
    user: updatedUser
  });
});*/
