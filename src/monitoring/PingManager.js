// Import node modules
const pingWebsite = require('./logic/websitePinger');
const { Website } = require('../database/database');

class PingManager {
  constructor() {
    // This global variable keeps track of running intervals
    this.intervals = [];
    // This global variable keeps track of the pinged websites
    this.websites = [];
  }

  // This function set up checking of websites
  async startPing() {
    // Get all websites
    const websites = await Website.find();
    // Check website availability at regular intervals, given by the checkInterval field
    websites.map((website) => {
      if (this.websites.indexOf(website._id) === -1) {
        const interval = setInterval(pingWebsite, website.checkInterval * 1000, website);
        // Keep track of running intervals to be able to cancel them later
        this.intervals.push(interval);
        // Add website to the list of pinged websites
        this.websites.push(website._id);
      }
    });
  }

  // This function stops checking of websites
  stopPing() {
    // Cancel all running intervals
    this.intervals.map((interval) => {
      clearInterval(interval);
    });
    // Empty the pinged websites
    this.websites = [];
  }
}

// Create a global PingManager using the ES6 singleton pattern
// It is the same instance which will be accessed from everywhere
const pingManager = new PingManager();

module.exports = pingManager;
