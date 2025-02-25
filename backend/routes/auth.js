const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const verifyToken = require('../middleware/jwtAuth');

// Public routes
router.post('/register', authController.register);
router.post('/login', authController.login);
router.get('/verify', authController.verifyToken);
router.post('/logout', authController.logout);
// Protected routes
router.post('/change-password', verifyToken, authController.changePassword);

module.exports = router;
