const express = require('express');
const router = express.Router();
const roomController = require('../controllers/roomController');
const passport = require('passport');

router.get('/', (req, res) => {
  res.send('ROOM ROUTER');
});

// create a new room (POST)
router.post(
  '/',
  (req, res, next) => {
    console.log('=== Session Debug ===');
    console.log('SessionID:', req.sessionID);
    console.log('Session:', req.session);
    console.log('Session Passport:', req.session.passport);
    console.log('Is authenticated:', req.isAuthenticated());
    console.log('User:', req.user);

    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    next();
  },
  roomController.createRoom
);

router.get('/:userId');

module.exports = router;
