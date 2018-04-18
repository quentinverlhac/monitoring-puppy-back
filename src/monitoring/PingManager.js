// Import node modules
const pingWebsite = require('./logic/websitePinger');
const { Website } = require('../database/database');

class PingManager {
  constructor() {
    // This global variable keeps track of running intervals
    this.intervals = [];
  }

  // This function set up checking of websites
  async startPing() {
    if (this.intervals.length === 0) {
      // Get all websites
      const websites = await Website.find().select('url checkInterval checkList');
      // Check website availability at regular intervals, given by the checkInterval field
      websites.map((website) => {
        const interval = setInterval(pingWebsite, website.checkInterval * 1000, website);
        // Keep track of running intervals to be able to cancel them later
        this.intervals.push(interval);
      });
      console.log(this.intervals);
    }
  }

  // This function stops checking of websites
  stopPing() {
    // Cancel all running intervals
    this.intervals.map((interval) => {
      clearInterval(interval);
    });
  }
}

const pingManager = new PingManager();

module.exports = pingManager;
