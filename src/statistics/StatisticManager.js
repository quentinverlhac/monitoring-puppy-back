// Import node modules
const { Website } = require('../database/database');
const computeStatistics = require('./logic/statisticsComputer');

// This class is responsible for computing and sending statistics to the front
// It creates and keeps track of statistics computing intervals
// They are responsible for computing and sending statistics regularly
// Statistics are sent through the socket between front and back
// When the socket is closed (the app stops monitoring), intervals are cleared
class StatisticsManager {
  constructor(socket) {
    // This variable keeps track of the socket for sending real-time statistics
    this.socket = socket;
    // This variable keeps track of running intervals
    this.intervals = [];
  }

  // This function is responsible for sending statistics through the socket
  sendStatistics(statistics) {
    console.log('Statistics sent !');
    this.socket.emit('statistics', statistics);
  }

  // This function set up computation of statistics every timestamp
  async startStatisticsComputing(timestamp, duration) {
  // Get all websites
    const websites = await Website.find();
    // Check website availability at regular intervals, given by the checkInterval field
    websites.map((website) => {
      const interval = setInterval(computeStatistics, timestamp, website, duration, this);
      // Keep track of running intervals to be able to cancel them later
      this.intervals.push(interval);
    });
  }

  // This function stops computing statistics
  stopStatisticsComputing() {
  // Cancel all running intervals
    this.intervals.map((interval) => {
      clearInterval(interval);
    });
  }
}

// Export the manager
module.exports = StatisticsManager;
