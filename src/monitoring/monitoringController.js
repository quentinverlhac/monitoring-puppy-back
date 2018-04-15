// Import node modules
const checkWebsite = require('../misc/websiteChecker');
const { Website } = require('../database/database');

const intervals = [];

async function runMonitoring(req, res, next) {
  try {
    console.log('Monitoring is running');
    // Get all websites
    const websites = await Website.find().select('url checkInterval checkList');
    // Check website availability at regular intervals, given by the checkInterval field
    websites.map((website) => {
      const interval = setInterval(checkWebsite, website.checkInterval * 1000, website);
      // Keep track of running intervals to be able to cancel them later
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
    // Cancel all running intervals
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

