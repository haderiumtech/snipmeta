const rateLimit = require('express-rate-limit');

const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000 || 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'development' 
    ? parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 500  // Allow 500 requests in dev
    : parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 30,   // 30 in production
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Don't rate limit home page and static assets in development
    if (process.env.NODE_ENV === 'development') {
      return req.path === '/' || req.path.startsWith('/css') || req.path.startsWith('/js') || req.path.startsWith('/images');
    }
    return req.path === '/';
  },
  keyGenerator: (req, res) => {
    return req.headers['x-forwarded-for'] || req.ip;
  }
});

module.exports = rateLimiter;
