const express = require('express');
const config = require('../../config/config');
const authRoutes = require('./auth.routes');
const gameRoutes = require('./game.routes');
const docsRoutes = require('./docs.routes');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/games',
    route: gameRoutes,
  },
];

const devRoutes = [
  {
    path: '/docs',
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
