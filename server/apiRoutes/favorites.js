const favoritesRouter = require('express').Router();
const { Favorite, User } = require('../db');
const { requireToken } = require('./gateKeepingMiddleware');

// GET /api/favorites/:userId (get user's favorites)
favoritesRouter.get('/:userId', requireToken, async (req, res, next) => {
  try {
    const { userId } = req.params;
    const userFavorite = await Favorite.findAll({ where: { userId: userId } });
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

// POST /api/favorite/venue/:yelpReferenceId (save/like venue in favorite)
favoritesRouter.post(
  '/venue/:yelpReferenceId',
  requireToken,
  async (req, res, next) => {
    try {
      const yelpReferenceId = req.params.yelpReferenceId;
      const venueInfo = req.body;
      const { token } = req.body;

      const userToAddLikedItemTo = await User.findByToken(token);

      const existingFavorite = await Favorite.findOne({
        where: {
          yelp_reference_id: yelpReferenceId,
          userId: userToAddLikedItemTo.id,
        },
      });

      if (existingFavorite) {
        res.send('Already liked item').status(200);
      } else {
        const savedItem = await Favorite.create({
          name: venueInfo.name,
          category: venueInfo.category,
          yelp_reference_id: yelpReferenceId,
          image_url: venueInfo.image_url[0],
          userId: userToAddLikedItemTo.id,
        });
        res.send(savedItem).status(200);
      }
    } catch (error) {
      next(error);
    }
  }
);

// POST /api/favorite/venue/:yelpReferenceId (save/like venue in favorite)
favoritesRouter.post(
  '/caterer/:yelpReferenceId',
  requireToken,
  async (req, res, next) => {
    try {
      const yelpReferenceId = req.params.yelpReferenceId;
      console.log('yelpReferenceId', yelpReferenceId);
      const catererInfo = req.body;
      console.log('catererInfo', catererInfo);

      const { token } = req.body;

      const userToAddLikedItemTo = await User.findByToken(token);

      const existingFavorite = await Favorite.findOne({
        where: {
          yelp_reference_id: yelpReferenceId,
          userId: userToAddLikedItemTo.id,
        },
      });
      if (existingFavorite) {
        res.send('Already liked item').status(200);
      } else {
        const savedItem = await Favorite.create({
          name: catererInfo.name,
          category: catererInfo.category,
          yelp_reference_id: yelpReferenceId,
          image_url: catererInfo.image_url[0],
          userId: userToAddLikedItemTo.id,
        });
        res.send(savedItem).status(200);
      }
    } catch (error) {
      next(error);
    }
  }
);

// delete liked venue
favoritesRouter.delete('/deleteVenue/:favoriteId', async (req, res, next) => {
  try {
    const { favoriteId } = req.params;
    const token = req.headers.authorization;
    const userToDeleteItemFrom = await User.findByToken(token);
    const itemDeleted = await Favorite.findOne({
      where: {
        id: favoriteId,
        userId: userToDeleteItemFrom.id,
      },
    });
    await itemDeleted.destroy();
    res.send(itemDeleted).status(200);
  } catch (error) {
    next(error);
  }
});

// delete caterer
favoritesRouter.delete('/deleteCaterer/:favoriteId', async (req, res, next) => {
  try {
    const { favoriteId } = req.params;
    const token = req.headers.authorization;

    const userToDeleteItemFrom = await User.findByToken(token);
    const itemDeleted = await Favorite.findOne({
      where: {
        id: favoriteId,
        userId: userToDeleteItemFrom.id,
      },
    });
    await itemDeleted.destroy();
    res.send(itemDeleted).status(200);
  } catch (error) {
    next(error);
  }
});

module.exports = favoritesRouter;
