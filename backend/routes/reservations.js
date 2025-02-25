const express = require('express');
const bookingController = require('../controllers/bookingController');
const verifyToken = require('../middleware/jwtAuth');
const router = express.Router();

router.get('/', verifyToken, bookingController.getAllBookings);

router.post('/', verifyToken, bookingController.createBooking);

router.delete('/:bookingId', verifyToken, bookingController.deleteBooking);

router.put('/:bookingId', verifyToken, bookingController.updateBooking);

module.exports = router;
