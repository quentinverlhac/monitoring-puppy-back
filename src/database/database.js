// Copyright (C) 2018 Quentin VERLHAC

// Import node package modules
const mongoose = require('mongoose');

const { websiteSchema, historySchema } = require('./schemas');

// Connect mongoose to the mongodb database
mongoose.connect('mongodb://puppy-db/test');

const db = mongoose.connection;

// Test if there is errors during the connection
db.on('error', console.error.bind(console, 'connection error:'));

// Once the connection is opened
db.once('open', () => {
  console.log('Successful connection to database');

  // Create models from mongodb schema
  const Website = db.model('website', websiteSchema);
  const History = db.model('history', historySchema);

  // Export models
  module.exports = {
    Website,
    History,
  };
});
