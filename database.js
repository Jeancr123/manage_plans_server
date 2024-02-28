const { Sequelize} = require('sequelize');

const sequelize = new Sequelize({
    dialect: process.env.DB_TYPE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT, // Default PostgreSQL port
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    dialectOptions: {
      ssl: true,
      rejectUnauthorized: false
    }
  });

  module.exports = sequelize;