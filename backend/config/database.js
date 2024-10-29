const { Pool } = require('pg');

require('dotenv').config();

/**
 * -------------------- DATABASE --------------------
 */

const pool = new Pool({
  host: process.env.DB_USER || 'localhost',
  user: process.env.DB_HOST || 'kosunghw',
  database: process.env.DB_NAME || 'booking_app',
  password: process.env.DB_PASSWORD || 'jan272012',
  port: process.env.DB_PORT || 5432,
});

module.exports = pool;
