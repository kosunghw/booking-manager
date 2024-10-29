// TODO:

/**
 * -------------------- ROOM MODEL --------------------
 */
const pool = require('./../config/database');

const createRoom = async (roomNumber, userId) => {
  const query = `
    INSERT INTO rooms (room_number,  user_id)
    VALUES ($1, $2);
    RETURNING *;
  `;
  const values = [roomNumber, userId];
  const result = await pool.query(query, values);
  return result.rows[0];
};

module.exports = { createRoom };
