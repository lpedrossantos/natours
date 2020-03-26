const express = require('express');
const userControler = require('./../controlers/userControler');
const authController = require('./../controlers/authController');

const router = express.Router();
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);
router.post('/forgotPassword', authController.forgetPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

//All routes are now protected from this middleware
router.use(authController.protect);

router.patch('/updateMyPassword', authController.updatePassword);

router.get('/me', userControler.getMe, userControler.getUser);
router.patch(
  '/updateMe',
  userControler.uploadUserPhoto,
  userControler.resizeUserPhoto,
  userControler.updateMe
);

router.delete('/deleteMe', userControler.deleteMe);

router.use(authController.restrictTo('admin'));
router
  .route('/')
  .get(userControler.getAllUsers)
  .post(userControler.createUser);
router
  .route('/:id')
  .get(userControler.getUser)
  .patch(userControler.updateUser)
  .delete(userControler.deleteUser);

module.exports = router;
