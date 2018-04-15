// Import node modules
const { Website } = require('../database/database');
const computeStatistics = require('../statistics/statisticsComputer');

// This global variable keeps track of running intervals
const intervals = [];

// This function set up computation of statistics every timestamp
async function startStatisticsComputing(timestamp, duration) {
  // Get all websites
  const websites = await Website.find().select('name');
  // Check website availability at regular intervals, given by the checkInterval field
  websites.map((website) => {
    const interval = setInterval(computeStatistics, timestamp, website.name, duration);
    // Keep track of running intervals to be able to cancel them later
    intervals.push(interval);
  });
}

// This function stops computing statistics
function stopStatisticsComputing() {
  // Cancel all running intervals
  intervals.map((interval) => {
    clearInterval(interval);
  });
}

module.exports = {
  startStatisticsComputing,
  stopStatisticsComputing,
};

