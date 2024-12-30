require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const { connectDB } = require("./confiq/database.js");
const { initDB } = require("./models");
const movieRoutes = require("./routes/movie.routes.js");

const app = express();

// Middleware
app.use(bodyParser.json());

// Connect to Database
connectDB();
initDB();

// Routes
app.use("/api/movie", movieRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
