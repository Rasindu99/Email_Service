const Bull = require('bull');

// Bull Queue configuration

const redisConfig = {
  redis: {
    host: process.env.REDIS_HOST || '127.0.0.1',
    port: process.env.REDIS_PORT || 6379,
  },
};

const emailQueue = new Bull('emailQueue', redisConfig);

module.exports = emailQueue;