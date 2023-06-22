const rateLimiter = require('express-rate-limit');

const limiter = rateLimiter({
  windowMs: 1000,
  max: 10,
  message: 'Превышено количество запросов в секунду',
});

module.exports = limiter;
