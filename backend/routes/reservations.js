const express = require('express');
const bookingController = require('../controllers/bookingController');
const isAuth = require('../middleware/auth');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('RESERVE ROUTER');
});

router.post('/', isAuth, bookingController.createBooking);

module.exports = router;
