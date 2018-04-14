// Import node modules
const checkWebsite = require('./websiteChecker');
const { Website } = require('../database/database');

const intervals = [];

async function runMonitoring(req, res, next) {
  try {
    const websites = await Website.find().select('url checkInterval -_id');
    websites.map((website) => {
      const interval = setInterval(checkWebsite, website.checkInterval * 1000, website);
      intervals.push(interval);
    });
  } catch (err) {
    next(err);
  }
}

async function stopMonitoring(req, res, next) {
  try {
    intervals.map((interval) => {
      clearInterval(interval);
    });
  } catch (err) {
    next(err);
  }
}

module.exports = {
  runMonitoring,
  stopMonitoring,
};

