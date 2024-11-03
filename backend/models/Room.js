// TODO:

/**
 * -------------------- ROOM MODEL --------------------
 */
const pool = require('./../config/database');

const roomModel = {
  // Create a room
  create: async (roomData) => {
    const { roomNumber, userId } = roomData;
    console.log('=======ROOM MODEL==========');
    console.log('room number:', roomNumber);
    console.log('user id:', userId);
    try {
      const query = `
        INSERT INTO rooms (room_number,  user_id)
        VALUES ($1, $2)
        RETURNING *`;
      const values = [roomNumber, userId];

      console.log('SQL Query:', query);
      console.log('Values:', values);

      const result = await pool.query(query, values);
      console.log('Query result: ', result.rows[0]);
      return result.rows[0];
    } catch (error) {
      console.error('PostgreSQL Error:', error);
      throw new Error(`Error creating room: ${error.message}`);
    }
  },

  // Get all rooms
  getAll: async () => {
    try {
      const result = await pool.query(`SELECT * FROM rooms`);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching rooms: ${error.message}`);
    }
  },

  // Get room by userID
  getById: async (userId) => {
    try {
      const result = await pool.query(
        `SELECT * FROM rooms WHERE user_id = $1`,
        [userId]
      );
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching room by ID: ${error.message}`);
    }
  },
};

module.exports = roomModel;
