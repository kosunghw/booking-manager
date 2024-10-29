const pool = require('./../config/database');

const createUser = async (username, hash, salt) => {
  const query = `
    INSERT INTO users (username, password_hash, salt)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [username, hash, salt];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query(`SELECT * FROM users WHERE username = $1`, [
    username,
  ]);
  return result.rows[0];
};

const findUserById = async (id) => {
  const result = await pool.query(`SELECT * FROM users WHERE user_id = $1`, [
    id,
  ]);
  return result.rows[0];
};

module.exports = { createUser, findUserById, findUserByUsername };
