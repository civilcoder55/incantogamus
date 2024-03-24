const logger = require('../config/logger');
const User = require('../models/user.model');

(async () => {
  logger.info('seeding users .....');
  await User.create({
    email: 'admin@example.com',
    password: 'password',
    role: 'admin',
    name: 'Admin',
  });
  logger.info(`users seeded`);
  process.exit();
})();
