const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

const router = express.Router();

router
  .route('/')
  .post(
    authController.protect,
    authController.restrictTo('admin'),
    userController.createUser
  )
  .get(
    authController.protect,
    authController.restrictTo('admin'),
    userController.getAllUsers
  );

router.post('/signUp', authController.signUp);
router.post('/loginUser', authController.loginUser);
router.post('/loginAdmin', authController.loginAdmin);
router.post('/logout', authController.logout);
router.post('/forgotPassword', authController.forgotPassword);
router.post('/resetPassword/:token', authController.resetPassowrd);
router.patch('/updatePassword', authController.protect, authController.updatePassword);
router.post('/verify-email/:token', authController.verifyEmail);

router.use(authController.protect);

router.post('/resend-email-verify-token', authController.resendEmailVerify);
router.get('/me', userController.getMe);
router.post(
  '/verify-account',
  userController.upload.fields([
    { name: 'selfie' },
    { name: 'selfieWithId' },
    { name: 'idFront' },
    { name: 'idBack' },
  ]),
  userController.uploadVerificationPhotos
);

router.patch('/verify-identity/:id', userController.approveIdData);

router.patch('/block/:id', authController.restrictTo('admin'), userController.blockUser);
router.patch(
  '/unblock/:id',
  authController.restrictTo('admin'),
  userController.unblockUser
);

router
  .route('/:id')
  .patch(userController.updateUser)
  .get(userController.getOneUser)
  .delete(authController.restrictTo('admin'), userController.deleteUser);

module.exports = router;
