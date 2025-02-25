const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const verifyToken = require('../middleware/jwtAuth');

// Public routes
router.post('/', userController.createUser); // Keep for backward compatibility

// Protected routes
router.get('/', verifyToken, userController.getAllUsers);
router.get('/:userId', verifyToken, userController.getUserById);
router.delete('/delete', verifyToken, userController.deleteUser);

module.exports = router;
