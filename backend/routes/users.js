const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const passport = require('passport');
const isAuth = require('../middleware/auth');

router.get('/', userController.getAllUsers);

router.post('/', userController.createUser);

router.post('/login', passport.authenticate('local'), (req, res) => {
  const { password_hash, created_at, ...safeUser } = req.user;
  res.json({ message: 'Login successful', user: safeUser });
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) {
      console.log('Logout Error:', err);
      return res.status(500).json({ message: 'Error logging out' });
    }
    res.clearCookie('userid');
    res.json({ message: 'Logged out successfully' });
  });
});

router.get('/:userId', isAuth, userController.getUserById);

module.exports = router;
