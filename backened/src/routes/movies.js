const express = require('express');
const router = express.Router();
const {
  getPopular,
  getTrending,
  searchMovies,
  getGenres,
  discoverByGenre,
  getMovieById,
  getMovieCredits,
  getMovieVideos,
  getRecommendations,
} = require('../controllers/movieController');

// Collection routes (no :id) — must come BEFORE /:id
router.get('/popular',   getPopular);
router.get('/trending',  getTrending);
router.get('/search',    searchMovies);
router.get('/genres',    getGenres);
router.get('/discover',  discoverByGenre);

// Single movie routes
router.get('/:id',                 getMovieById);
router.get('/:id/credits',         getMovieCredits);
router.get('/:id/videos',          getMovieVideos);
router.get('/:id/recommendations', getRecommendations);

module.exports = router;