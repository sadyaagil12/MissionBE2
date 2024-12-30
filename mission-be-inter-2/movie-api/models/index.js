const { sequelize } = require('../confiq/database');
const Movie = require('./movie.model');

const initDB = async () => {
  await sequelize.sync({ force: false }); 
  console.log('Database synced');
};

module.exports = { initDB, Movie };
