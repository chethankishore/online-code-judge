const { createClient } = require('redis');

let redisClient = null;

const connectRedis = async () => {
  try {
    redisClient = createClient({
      url: `redis://default:${process.env.REDIS_PASSWORD}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
      socket: {
        reconnectStrategy: (retries) => {
          if (retries > 3) {
            console.warn('⚠️  Redis max retries reached, disabling Redis');
            return false;
          }
          return 1000;
        }
      }
    });

    redisClient.on('error', (err) => {
      console.warn('⚠️  Redis Error:', err.message);
    });

    await redisClient.connect();
    console.log('✅ Redis Connected');

  } catch (error) {
    console.warn('⚠️  Redis failed, continuing without Redis:', error.message);
    redisClient = null;
  }
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };