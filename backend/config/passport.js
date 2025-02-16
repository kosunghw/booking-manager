// TODO: Finish Passport Setup
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pgPool = require('./database');
const userModel = require('../models/User');
const validPassword = require('./passwordUtils').validPassword;

const verifyCallback = async (username, password, done) => {
  try {
    const query = `SELECT * FROM users WHERE username = $1`;
    const values = [username];
    const res = await pgPool.query(query, values);

    const user = res.rows[0];

    if (!user || !user.password_hash) {
      return done(null, false, { message: 'Incorrect username or password' });
    }

    const isValid = validPassword(password, user.password_hash);

    if (isValid) {
      console.log('authentication complete!');
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    done(err);
  }
};

const strategy = new LocalStrategy(
  {
    usernameField: 'username',
    passwordField: 'password',
  },
  verifyCallback
);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (userId, done) => {
  try {
    const res = await userModel.getById(userId);
    done(null, res); // Return the user object
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
