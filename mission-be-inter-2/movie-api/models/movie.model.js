const { DataTypes } = require("sequelize");
const { sequelize } = require("../confiq/database");

const Movie = sequelize.define("series_film", {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  release_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Movie;
