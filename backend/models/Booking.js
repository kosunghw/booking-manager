// TODO:

/**
 * -------------------- BOOKING MODEL --------------------
 */
const pool = require('../config/database');

const getAllBooking = async () => {
  const result = await pool.query(`
      SELECT * FROM bookings;
    `);

  return result.rows;
};

const createBooking = async (roomId, customerName, checkIn, checkOut) => {
  const query = `
    INSERT INTO bookings (room_id, customer_name, check_in, check_out)
    VALUES ($1, $2, $3, $4);
    RETURNING *;
  `;
  const values = [roomId, customerName, checkIn, checkOut];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { createBooking, getAllBooking };
