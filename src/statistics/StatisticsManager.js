// Import node modules
const { Website } = require('../database/database');
const computeStatistics = require('./statisticsComputer');

class StatisticsManager {
  constructor(socket) {
    // This variable keeps track of the socket for sending live statistics
    this.socket = socket;
    // This variable keeps track of running intervals
    this.intervals = [];
  }

  sendStatistics(statistics) {
    console.log('Statistics sent !');
    console.log(this.socket);
    this.socket.emit('statistics', statistics);
  }

  // This function set up computation of statistics every timestamp
  async startStatisticsComputing(timestamp, duration) {
  // Get all websites
    const websites = await Website.find().select('name');
    // Check website availability at regular intervals, given by the checkInterval field
    websites.map((website) => {
      const interval = setInterval(computeStatistics, timestamp, website.name, duration, this);
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

module.exports = StatisticsManager;

