// Copyright (C) 2018 Quentin VERLHAC

// Import node package modules
const Sequelize = require('sequelize');
const config = require('../../config.json');


// Create an instance of sequelize
const sequelize = new Sequelize(config.dbName, config.dbLogin, config.dbPassword, {
  host: config.dbHostname,
  dialect: 'mysql',
});

// Test the connection by trying to authenticate to the database
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
