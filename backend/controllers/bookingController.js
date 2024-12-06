const bookingModel = require('../models/Booking');

const bookingController = {
  createBooking: async (req, res) => {
    try {
      const { room_id, check_in, check_out } = req.body;

      // Check if room is available
      const isAvailable = await bookingModel.checkRoomAvailability(
        room_id,
        check_in,
        check_out
      );

      if (!isAvailable) {
        return res.status(400).json({
          message: 'Room is not available for selected dates',
        });
      }

      const booking = await bookingModel.create(req.body);
      res.status(201).json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getAllBookings: async (req, res) => {
    try {
      const userId = req.user.user_id; // Change from req.user.id to req.user.user_id
      console.log('Fetching bookings for userId:', userId);
      const bookings = await bookingModel.getAll(userId);
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  getBookingById: async (req, res) => {
    try {
      const booking = await bookingModel.getById(req.params.id);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  updateBooking: async (req, res) => {
    try {
      const booking = await bookingModel.update(req.params.id, req.body);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },

  deleteBooking: async (req, res) => {
    try {
      const booking = await bookingModel.delete(req.params.bookingId);
      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }
      res.json({ message: 'Booking deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  },
};

module.exports = bookingController;
