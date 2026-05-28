// server.js

const app = require('./app');

const connectDB =
  require('./config/db');

const {
  connectRedis,
  getRedisClient,
} = require('./config/redis');

const PORT =
  process.env.PORT || 5000;

/**
 * CONNECT DATABASE
 */

connectDB();

/**
 * CONNECT REDIS
 * Optional for now
 */

connectRedis().then(() => {
  const client =
    getRedisClient();

  if (client) {
    client
      .ping()
      .then(() => {
        console.log(
          '✅ Redis ping successful'
        );
      })
      .catch((err) => {
        console.warn(
          '⚠️ Redis ping failed:',
          err.message
        );
      });
  }
});

/**
 * START SERVER
 */

const server = app.listen(
  PORT,
  () => {
    console.log(
      `\n🚀 Server running on port ${PORT}`
    );

    console.log(
      `🔗 API URL: http://localhost:${PORT}`
    );

    console.log(
      `📝 Environment: ${process.env.NODE_ENV}`
    );

    console.log(
      `\n✅ Ready to accept requests!\n`
    );
  }
);

/**
 * HANDLE UNHANDLED PROMISE REJECTIONS
 */

process.on(
  'unhandledRejection',
  (err) => {
    console.log(
      '❌ UNHANDLED REJECTION!',
      err
    );

    server.close(() => {
      process.exit(1);
    });
  }
);