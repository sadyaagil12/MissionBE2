const { Movie } = require('../models');
const Joi = require('joi');

// Validasi Input
const validateItem = (data) => {
  const schema = Joi.object({
    title: Joi.string().required(),
    release_date: Joi.string().required(),
    description: Joi.string().required(),
  });
  return schema.validate(data);
};

// Utility for API responses
const createResponse = (success, message, data = null) => ({
  success,
  message,
  data,
});

// CRUD Operations
const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.findAll();
    res.json(createResponse(200, 'Movies retrieved successfully', movies));
  } catch (error) {
    res.status(500).json(createResponse(500, 'An error occurred while retrieving movies', error.message));
  }
};

const createMovie = async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).json(createResponse(400, 'Validation error', error.details[0].message));

  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(createResponse(201, 'Movie created successfully', movie));
  } catch (error) {
    res.status(500).json(createResponse(500, 'An error occurred while creating the movie', error.message));
  }
};

const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json(createResponse(404, 'Movie not found'));
    res.json(createResponse(200, 'Movie retrieved successfully', movie));
  } catch (error) {
    res.status(500).json(createResponse(500, 'An error occurred while retrieving the movie', error.message));
  }
};

const updateMovie = async (req, res) => {
  const { error } = validateItem(req.body);
  if (error) return res.status(400).json(createResponse(400, 'Validation error', error.details[0].message));

  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json(createResponse(404, 'Movie not found'));

    await movie.update(req.body);
    res.json(createResponse(200, 'Movie updated successfully', movie));
  } catch (error) {
    res.status(500).json(createResponse(500, 'An error occurred while updating the movie', error.message));
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json(createResponse(404, 'Movie not found'));

    await movie.destroy();
    res.status(200).json(createResponse(200, 'Movie deleted successfully'));
  } catch (error) {
    res.status(500).json(createResponse(500, 'An error occurred while deleting the movie', error.message));
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
};
