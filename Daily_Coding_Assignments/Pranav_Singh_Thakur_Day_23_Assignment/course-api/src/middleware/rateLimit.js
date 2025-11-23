const rateLimit = require("express-rate-limit");

const courseRateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, 
  max: 5,                  
  message: { error: "Too many requests" }
});

module.exports = courseRateLimiter;
