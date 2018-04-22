// Import node modules
const { Website } = require('../database/database');
const checkAvailability = require('./logic/availabilityChecker');

class AlertManager {
  constructor(socket) {
    // This variable keeps track of the socket for sending live statistics
    this.socket = socket;
    // This variable keeps track of running intervals
    this.intervals = [];
  }

  sendAlert(alert) {
    console.log('Alert sent !');
    this.socket.emit('alert', alert);
  }

  // This function set up check of availability every timestamp
  async startWatching(timestamp, duration) {
  // Get all websites
    const websites = await Website.find();
    // Check website availability at regular intervals, given by the checkInterval field
    websites.map((website) => {
      const interval = setInterval(checkAvailability, timestamp, website, duration, this);
      // Keep track of running intervals to be able to cancel them later
      this.intervals.push(interval);
    });
  }

  // This function stops computing statistics
  stopWatching() {
  // Cancel all running intervals
    this.intervals.map((interval) => {
      clearInterval(interval);
    });
  }
}

module.exports = AlertManager;

