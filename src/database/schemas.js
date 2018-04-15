// Import node package modules
const mongoose = require('mongoose');

// Create a schema for website ping logs
const logSchema = new mongoose.Schema({
  website: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
  dateTimestamp: Number,
  answered: Boolean,
  responseTime: Number,
  responseCode: String,
});

// Create a schema for website information
const websiteSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
  },
  url: {
    type: String,
    unique: true,
  },
  checkInterval: Number,
});

// Create a schema for alert history
const historySchema = new mongoose.Schema({
  website: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
  status: String,
  availability: Number,
  dateTimestamp: Number,
});

// Export schemas
module.exports = {
  logSchema,
  websiteSchema,
  historySchema,
};

