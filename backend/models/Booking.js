// TODO:

/**
 * -------------------- BOOKING MODEL --------------------
 */
const pool = require('../config/database');

const bookingModel = {
  // Create a new booking
  create: async (reservationData) => {
    const { room_id, customer_name, check_in, check_out, phone_number } =
      reservationData;
    try {
      const result = await pool.query(
        `INSERT INTO bookings
        (room_id, customer_name, check_in, check_out, phone_number)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *`,
        [room_id, customer_name, check_in, check_out, phone_number]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating booking: ${error.message}`);
    }
  },

  // Get all bookings
  getAll: async (userId) => {
    try {
      const result = await pool.query(
        `SELECT
          b.booking_id,
          b.room_id,
          b.customer_name,
          TO_CHAR(b.check_in, 'YYYY-MM-DD') as check_in,
          TO_CHAR(b.check_out, 'YYYY-MM-DD') as check_out,
          b.phone_number,
          b.created_at,
          r.room_number
        FROM bookings b
        JOIN rooms r ON b.room_id = r.room_id
        WHERE r.user_id = $1
        ORDER BY b.created_at ASC`,
        [userId]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching bookings: ${error.message}`);
    }
  },

  // Get booking by ID
  getById: async (bookingId) => {
    try {
      const result = await pool.query(
        `SELECT * FROM bookings WHERE booking_id = $1`,
        [bookingId]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching booking: ${error.message}`);
    }
  },

  // Update booking
  update: async (bookingId, updateData) => {
    const { room_id, customer_name, phone_number, check_in, check_out } =
      updateData;
    try {
      const result = await pool.query(
        `UPDATE bookings
        SET
          room_id = COALESCE($1, room_id),
          customer_name = COALESCE($2, customer_name),
          check_in = COALESCE($3, check_in),
          check_out = COALESCE($4, check_out),
          phone_number = COALESCE($5, phone_number)
        WHERE booking_id = $6
        RETURNING *`,
        [room_id, customer_name, check_in, check_out, phone_number, bookingId]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating booking: ${error.message}`);
    }
  },

  // Delete booking
  delete: async (bookingId) => {
    try {
      const result = await pool.query(
        `DELETE FROM bookings WHERE booking_id = $1 RETURNING *`,
        [bookingId]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting booking: ${error.message}`);
    }
  },

  // Check availability
  checkRoomAvailability: async (roomId, checkIn, checkOut) => {
    try {
      const result = await pool.query(
        `SELECT COUNT(*)
        FROM bookings
        WHERE room_id = $1
        AND (
        (check_in < $3 AND check_out > $2)
      )`,
        [roomId, checkIn, checkOut]
      );
      return parseInt(result.rows[0].count) === 0;
    } catch (error) {
      throw new Error(`Error checking room availability: ${error.message}`);
    }
  },
};

module.exports = bookingModel;
