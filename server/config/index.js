
require('dotenv').config();

module.exports = {
  env: process.env.NODE_ENV || 'development',
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET || 'supersecret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '1d',
  apiKeys: {
    alphaVantage: process.env.ALPHA_VANTAGE_API_KEY,
    twelveData: process.env.TWELVE_DATA_API_KEY,
    yahooFinance: process.env.YAHOO_FINANCE_API_KEY,
    finnhub: process.env.FINNHUB_API_KEY,
    metaTrader: process.env.META_TRADER_API_KEY
  },
  defaultCacheTime: 60 * 5, // 5 minutos em segundos
};
