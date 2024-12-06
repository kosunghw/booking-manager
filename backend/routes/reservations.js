const express = require('express');
const bookingController = require('../controllers/bookingController');
const isAuth = require('../middleware/auth');
const router = express.Router();

router.get('/', isAuth, bookingController.getAllBookings);

router.post('/', isAuth, bookingController.createBooking);

router.delete('/:bookingId', isAuth, bookingController.deleteBooking);

router.put('/:bookingId', isAuth, bookingController.updateBooking);

module.exports = router;
