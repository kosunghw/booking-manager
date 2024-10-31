const pool = require('./../config/database');

const userModel = {
  // Create a new user
  create: async (userData) => {
    const { username, password_hash } = userData;
    try {
      const result = await pool.query(
        `INSERT INTO users
        (username, password_hash)
        VALUES ($1, $2)
        RETURNING *`,
        [username, password_hash]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  },

  // Get all users
  getAll: async () => {
    try {
      const result = await pool.query(`SELECT * FROM users`);
      return result.rows;
    } catch (error) {
      throw new Error(`Error fetching users: ${error.message}`);
    }
  },

  // Get user by ID
  getById: async (userId) => {
    try {
      const result = await pool.query(
        `SELECT * FROM users WHERE user_id = $1`,
        [userId]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching user by ID: ${error.message}`);
    }
  },

  // Get user by username
  getByName: async (username) => {
    try {
      const result = await pool.query(
        `SELECT * FROM users WHERE username = $1`,
        [username]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error fetching user by username: ${error.message}`);
    }
  },

  // Update user
  update: async (userId, updateData) => {
    const { username, password_hash } = updateData;
    try {
      const result = await pool.query(
        `UPDATE users
        SET
          username = COALESCE($1, username),
          password_hash = COALESCE($2, password_hash),
        WHERE user_id = $5
        RETURNING *`,
        [username, password_hash, userId]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  },

  // Delete user
  delete: async (userId) => {
    try {
      const result = await pool.query(
        `DELETE FROM users WHERE user_id = $1 RETURNING *`,
        [userId]
      );
      return result.rows[0];
    } catch (error) {
      throw new Error(`Error deleting user: ${error.message}`);
    }
  },
};

module.exports = userModel;
