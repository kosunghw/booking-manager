const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const verifyToken = require('../middleware/jwtAuth');

router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.post('/login', passport.authenticate('local'), userController.login);

router.post('/logout', userController.logout);

router.get('/:userId', verifyToken, userController.getUserById);

router.delete('/delete', verifyToken, userController.deleteUser);

module.exports = router;
