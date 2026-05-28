// app.js

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const passport = require('./config/passport');

const app = express();


/**
 * TRUST PROXY
 * Required for secure cookies in production
 */

app.set('trust proxy', 1);

/**
 * BODY PARSERS
 */

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cookieParser());

/**
 * CORS
 */

app.use(
  cors({
    origin:
      process.env.FRONTEND_URL ||
      'http://localhost:5173',

    credentials: true,
  })
);

/**
 * SESSION
 */

app.use(
  session({
    secret:
      process.env.SESSION_SECRET,

    resave: false,

    saveUninitialized: false,

    cookie: {
      secure:
        process.env.NODE_ENV ===
        'production',

      httpOnly: true,

      sameSite: 'lax',

      maxAge:
        7 *
        24 *
        60 *
        60 *
        1000,
    },
  })
);

/**
 * PASSPORT
 */

app.use(passport.initialize());

app.use(passport.session());

/**
 * REQUEST LOGGER
 */

app.use((req, res, next) => {
  console.log(
    `${req.method} ${req.path}`
  );

  next();
});

/**
 * ROUTES
 */

const authRoutes = require('./routes/authRoutes');

const problemRoutes = require('./routes/problemRoutes');

const submissionRoutes = require('./routes/submissionRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const leaderboardRoutes = require('./routes/leaderboardRoutes');
// const userRoutes = require('./routes/userRoutes');
// app.use('/api/user', userRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(
  '/api/auth',
  authRoutes
);

app.use(
  '/api/problems',
  problemRoutes
);

app.use(
  '/api/submissions',
  submissionRoutes
);

/**
 * TEST ROUTE
 */

app.get('/api/test', (req, res) => {
  res.json({
    success: true,

    message:
      'Backend is working!',

    timestamp: new Date(),

    mongodb:
      process.env.MONGODB_URI
        ? 'Configured'
        : 'Not configured',
  });
});

/**
 * HEALTH CHECK
 */

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date(),
  });
});

/**
 * 404 HANDLER
 */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.url} not found`,
  });
});

/**
 * GLOBAL ERROR HANDLER
 */

app.use(
  (err, req, res, next) => {
    console.error(
      '❌ Error:',
      err.message
    );

    const statusCode =
      res.statusCode === 200
        ? 500
        : res.statusCode;

    res.status(statusCode);

    res.json({
      success: false,

      message: err.message,

      stack:
        process.env.NODE_ENV ===
        'production'
          ? null
          : err.stack,
    });
  }
);

module.exports = app;