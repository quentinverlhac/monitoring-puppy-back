// Import node modules
const pingWebsite = require('./logic/websitePinger');
const { Website } = require('../database/database');

// This class is responsible for websites ping
// It creates and keeps track of ping intervals
// These intervals are responsible for ping regularly
// The Manager ensure there is only one interval per website using two principles:
// 1 - The Manager follows the singleton pattern: there is only one instance of it
// 2 - When startPing is called, the Manager doesn't create interval for currently pinged websites
class PingManager {
  constructor() {
    // This global variable keeps track of running intervals
    this.intervals = [];
    // This global variable keeps track of the pinged websites
    this.websites = [];
  }

  // This function set up ping of websites
  // If a website is already regularly checked, the function will not create a new interval for it
  async startPing() {
    // Get all websites
    const websites = await Website.find();
    // Check website availability at regular intervals, given by the checkInterval field
    websites.map((website) => {
      // If the website is not already checked
      if (this.websites.indexOf(website.id) === -1) {
        const interval = setInterval(pingWebsite, website.checkInterval * 1000, website);
        // Keep track of running intervals to be able to cancel them later
        this.intervals.push(interval);
        // Add website to the list of pinged websites
        this.websites.push(website.id);
      }
    });
  }

  // This function stops checking of websites
  stopPing() {
    // Cancel all running intervals
    this.intervals.map((interval) => {
      clearInterval(interval);
    });
    // Empty the currently checked websites
    this.websites = [];
  }
}

// Create a global PingManager using the ES6 singleton pattern
// It is the same instance which will be accessed from everywhere
const pingManager = new PingManager();

// Export the unique pingManager instance
module.exports = pingManager;
