// Copyright (C) 2018 Quentin VERLHAC

// Import node package modules
const mongoose = require('mongoose');

// Connect mongoose to the database

mongoose.connect('mongodb://puppy-db/test');

const db = mongoose.connection;

// Test the connection by trying to authenticate to the database

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

module.exports = db;

