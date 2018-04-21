// Import node modules
const mongoose = require('mongoose');

// Create a schema for website ping logs
const logSchema = new mongoose.Schema({
  website: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
  dateTimestamp: Number,
  success: Boolean,
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
  isDown: Boolean,
});

// Create a schema for alert history
const alertSchema = new mongoose.Schema({
  website: { type: mongoose.Schema.Types.ObjectId, ref: 'Website' },
  status: String,
  availability: Number,
  dateTimestamp: Number,
});

// Export schemas
module.exports = {
  logSchema,
  websiteSchema,
  alertSchema,
};

