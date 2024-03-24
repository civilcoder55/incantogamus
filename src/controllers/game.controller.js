const httpStatus = require('http-status');
const pick = require('../utils/pick');
const wrapper = require('../utils/wrapper');
const { gameService } = require('../services');
const ApiError = require('../errors/ApiError');
const hashFrom = require('../utils/hashFrom');
const cacheHelper = require('../helpers/cache.helper');

const createGame = wrapper(async (req, res) => {
  const game = await gameService.createGame(req.body);

  res.status(httpStatus.CREATED).json({ data: game });
});

const getGames = wrapper(async (req, res) => {
  const filter = pick(req.query, ['type']);
  const options = pick(req.query, ['sortBy', 'sortType', 'limit', 'page']);

  const data = await cacheHelper.hashGetOrSet(`games`, hashFrom(filter, options), () =>
    gameService.queryGames(filter, options),
  );

  res.json({ data });
});

const getGame = wrapper(async (req, res) => {
  const game = await gameService.getGameById(req.params.gameId);

  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }

  res.json({ data: game });
});

const updateGame = wrapper(async (req, res) => {
  const game = await gameService.updateGameById(req.params.gameId, req.body);

  res.json({ data: game });
});

const deleteGame = wrapper(async (req, res) => {
  await gameService.deleteGameById(req.params.gameId);

  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createGame,
  getGames,
  getGame,
  updateGame,
  deleteGame,
};
