// Import node modules
const checkWebsite = require('./websiteChecker');
const { Website } = require('../database/database');

const intervals = [];

async function runMonitoring(req, res, next) {
  try {
    console.log('Monitoring is running');
    const websites = await Website.find().select('url checkInterval checkList');
    websites.map((website) => {
      const interval = setInterval(checkWebsite, website.checkInterval * 1000, website);
      intervals.push(interval);
    });
    res.send('Monitoring is running');
  } catch (err) {
    next(err);
  }
}

async function stopMonitoring(req, res, next) {
  try {
    console.log('Monitoring stopped');
    intervals.map((interval) => {
      clearInterval(interval);
    });
    res.send('Monitoring stopped');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  runMonitoring,
  stopMonitoring,
};

