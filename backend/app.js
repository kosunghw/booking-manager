const express = require('express');
const session = require('express-session');
const cors = require('cors');
const cookieParser = require('cookie-parser');
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
app.use(cookieParser());

app.use(
  cors({
    origin: [
      'https://booking-manager-lake.vercel.app',
      'https://booking-manager-psi.vercel.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: {
      secure: true,
      httpOnly: true,
      sameSite: 'none',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      domain: '.onrender.com',
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/auth', authRoutes); // Login / Logout routes

app.use('/api/rooms', roomRoutes);

app.use('/api/reservations', reservationRoutes);
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}!`);
});
