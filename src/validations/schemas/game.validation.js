const Joi = require('joi');

const createGame = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    releaseDate: Joi.string().required().isoDate(),
    genre: Joi.string().required(),
    publisher: Joi.string(),
  }),
};

const getGames = {
  query: Joi.object().keys({
    sortBy: Joi.string().valid('id', 'releaseDate').default('id'),
    sortType: Joi.string().valid('desc', 'asc').default('desc'),
    limit: Joi.number().integer().max(100).default(10),
    page: Joi.number().integer().default(1),
  }),
};

const getGame = {
  params: Joi.object().keys({
    gameId: Joi.number().required(),
  }),
};

const updateGame = {
  params: Joi.object().keys({
    gameId: Joi.number().required(),
  }),
  body: Joi.object()
    .keys({
      title: Joi.string(),
      content: Joi.string(),
      type: Joi.string().valid('personal', 'work'),
    })
    .min(1),
};

const deleteGame = {
  params: Joi.object().keys({
    gameId: Joi.number().required(),
  }),
};

module.exports = {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
};
