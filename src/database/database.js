// Import node package modules
const mongoose = require('mongoose');

const { logSchema, websiteSchema, historySchema } = require('./schemas');

// Connect mongoose to the mongodb database
mongoose.connect('mongodb://puppy-db/test');

const db = mongoose.connection;

// Test if there is errors during the connection
db.on('error', console.error.bind(console, 'connection error:'));

// Display in console when the connection is successfully opened
db.once('open', () => {
  console.log('Successful connection to database');
});

// Create models from mongodb schema
const Website = db.model('website', websiteSchema);
const Log = db.model('log', logSchema);
const History = db.model('history', historySchema);

// Export models
module.exports = {
  Log,
  Website,
  History,
};
