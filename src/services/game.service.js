const httpStatus = require('http-status');
const Game = require('../models/game.model');
const ApiError = require('../errors/ApiError');

const getGameByName = async (name) => {
  return Game.findOne({ where: { name } });
};

const validateUniqueTitle = async (name, gameId = null) => {
  if (!name) return;

  const existingGame = await getGameByName(name);

  if (existingGame && existingGame.id !== gameId) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Name already taken');
  }
};

const createGame = async (data) => {
  await validateUniqueTitle(data.name);

  return Game.create(data);
};

const queryGames = async (filter, options) => {
  const games = await Game.findAll({
    where: {
      ...filter,
    },
    order: [[options.sortBy, options.sortType]],
    limit: options.limit,
    offset: (options.page - 1) * options.limit,
  });

  return games;
};

const getGameById = async (gameId) => {
  return Game.findOne({ where: { id: gameId } });
};

const updateGameById = async (gameId, data) => {
  const game = await getGameById(gameId);

  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }

  await validateUniqueTitle(data.name, gameId);

  return game.update(data);
};

const deleteGameById = async (userId, gameId) => {
  const game = await getGameById(gameId);

  if (!game) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Game not found');
  }

  return game.destroy();
};

module.exports = {
  createGame,
  queryGames,
  getGameById,
  updateGameById,
  deleteGameById,
};
