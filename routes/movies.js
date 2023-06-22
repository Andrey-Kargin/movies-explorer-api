const moviesRouter = require('express').Router();

const {
  createMovie,
  getMovies,
  deleteMovie,
} = require('../controllers/movies');

moviesRouter.post('/', createMovie);
moviesRouter.get('/', getMovies);
moviesRouter.delete('/:_id', deleteMovie);

module.exports = moviesRouter;
