const { Pool } = require('pg');

require('dotenv').config();

/**
 * -------------------- DATABASE --------------------
 */

module.exports = new Pool({
  host: 'localhost',
  user: 'kosunghw',
  database: 'booking_app',
  password: 'jan272012',
  port: 5432,
});
