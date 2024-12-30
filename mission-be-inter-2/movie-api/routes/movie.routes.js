const express = require("express");
const router = express.Router();
const {
  getAllMovies,
  createMovie,
  getMovieById,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie.controller.js");

router.get("/", getAllMovies);
router.post("/", createMovie);
router.get("/:id", getMovieById);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

module.exports = router;
