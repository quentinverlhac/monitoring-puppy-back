// Import node package modules
const mongoose = require('mongoose');

// Create a schema for website ping logs
const logSchema = new mongoose.Schema({
  date: Date,
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
  checkList: [logSchema],
});

// Create a schema for alert history
const historySchema = new mongoose.Schema({
  website: [{ type: mongoose.Schema.Types.ObjectId, ref: 'websiteSchema' }],
  status: String,
  availability: Number,
  time: Number,
});

// Export schemas
module.exports = {
  websiteSchema,
  historySchema,
};

