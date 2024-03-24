const httpStatus = require('http-status');
const wrapper = require('../utils/wrapper');
const logger = require('../config/logger');
const mysql = require('../datastores/mysql');
const redis = require('../datastores/redis');

const healthCheck = wrapper(async (req, res) => {
  try {
    // check database connection
    await mysql.authenticate();
    await redis.ping();

    const result = {
      uptime: process.uptime(),
      message: 'OK',
      timestamp: Date.now(),
    };

    return res.status(httpStatus.OK).json(result);
  } catch (error) {
    logger.error(error);
    return res.sendStatus(httpStatus.SERVICE_UNAVAILABLE);
  }
});

module.exports = {
  healthCheck,
};
