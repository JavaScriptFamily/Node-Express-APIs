const express = require('express');
const router  = express.Router();
const auth    = require('../middleware/auth');
const authController  = require('../controller/authController');

router.post('/signup', authController.signupUser);
router.post('/login', authController.loginUser);
router.post('/admin-login', authController.adminLogin);
router.get('/logout', auth, authController.logout);
router.post('/forgot-password', authController.forgotPassword);
router.get('/verify-forgot-password-token/:token', authController.verifyForgotPasswordToken);
router.post('/reset-password', authController.resetPassword);
router.post('/update-password', auth, authController.updatePassword);

module.exports = router;