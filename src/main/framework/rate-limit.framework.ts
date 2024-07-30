import rateLimit from 'express-rate-limit'

export const ExpressRateLimit = rateLimit({
  windowMs: 3 * 60 * 1000, // 3 minute
  max: 100,
  headers: false
})
