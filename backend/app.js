const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const { Pool } = require('pg');
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const reservationRoutes = require('./routes/reservations');
const userRoutes = require('./routes/users');

require('dotenv').config();

// Require Passport config before initializing Passport
require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes); // Login / Logout routes

// Routes that need authentication
// app.use('/api/*', ensureAuthenticated);
app.use('/api/rooms', roomRoutes);
app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);

app.get('/', (req, res) => res.send('Hello, world!'));

app.listen(PORT, () => {
  console.log(`My first Express app - listening on port ${PORT}!`);
});
