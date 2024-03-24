const express = require('express');
const validator = require('../../middlewares/validator');
const gameValidationSchema = require('../../validations/schemas/game.validation');
const gameController = require('../../controllers/game.controller');
const { auth, isAdmin } = require('../../middlewares/auth');

const router = express.Router();

router
  .route('/')
  .post(auth, isAdmin, validator(gameValidationSchema.createGame), gameController.createGame)
  .get(auth, validator(gameValidationSchema.getGames), gameController.getGames);

router
  .route('/:gameId')
  .get(auth, validator(gameValidationSchema.getGame), gameController.getGame)
  .patch(auth, isAdmin, validator(gameValidationSchema.updateGame), gameController.updateGame)
  .delete(auth, isAdmin, validator(gameValidationSchema.deleteGame), gameController.deleteGame);

module.exports = router;
