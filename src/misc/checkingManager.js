// Import node modules
const checkWebsite = require('../misc/websiteChecker');
const { Website } = require('../database/database');

// This global variable keeps track of running intervals
const intervals = [];

// This function set up checking of websites
async function startChecking() {
  // Get all websites
  const websites = await Website.find().select('url checkInterval checkList');
  // Check website availability at regular intervals, given by the checkInterval field
  websites.map((website) => {
    const interval = setInterval(checkWebsite, website.checkInterval * 1000, website);
    // Keep track of running intervals to be able to cancel them later
    intervals.push(interval);
  });
}

// This function stops checking of websites
function stopChecking() {
  // Cancel all running intervals
  intervals.map((interval) => {
    clearInterval(interval);
  });
}

module.exports = {
  startChecking,
  stopChecking,
};
