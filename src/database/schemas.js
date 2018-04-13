const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  date: Date,
  answered: Boolean,
  responseTime: Number,
  responseCode: String,
});

const websiteSchema = new mongoose.Schema({
  name: String,
  url: String,
  checkInterval: Number,
  checkList: [logSchema],
});

const historySchema = new mongoose.Schema({
  website: [{ type: mongoose.Schema.Types.ObjectId, ref: 'websiteSchema' }],
  status: String,
  availability: Number,
  time: Number,
});

module.exports = {
  websiteSchema,
  historySchema,
};

