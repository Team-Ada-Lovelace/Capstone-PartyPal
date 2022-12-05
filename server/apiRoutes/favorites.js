const favoritesRouter = require('express').Router();
const { Favorite } = require('../db');
const { requireToken, isAdmin } = require('./gateKeepingMiddleware');

// GET user's favorites
favoritesRouter.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userFavorite = await Favorite.findAll({ where: { userId: userId } });
    console.log('userFavorite =,', userFavorite);
    // userFavorite is an array with objects(favorite.id, favorite.name)
    if (userFavorite) {
      res.send(userFavorite);
    } else {
      res.send('no favorite');
    }
  } catch (error) {
    console.log(`api/favorites get('/:userId') ERROR:`, error);
    next(error);
  }
});

module.exports = favoritesRouter;
