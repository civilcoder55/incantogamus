const express = require('express');
const config = require('../config/config');
const authRoutes = require('./v1/auth.routes');
const gameRoutes = require('./v1/game.routes');
const docsRoutes = require('./v1/docs.routes');
const healthRoutes = require('./health.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/health',
    route: healthRoutes,
  },
  {
    path: '/v1/auth',
    route: authRoutes,
  },
  {
    path: '/v1/games',
    route: gameRoutes,
  },
];

const devRoutes = [
  {
    path: '/v1/docs',
    route: docsRoutes,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
