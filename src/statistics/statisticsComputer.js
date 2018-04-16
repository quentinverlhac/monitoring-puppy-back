// Import node modules
const { Log } = require('../database/database');
const getLogs = require('../misc/logGetter');
const computeAvailability = require('./availabilityComputer');
const { computeMaxResponseTime, computeAverageResponseTime } = require('./responseTimeComputer');
const countResponseCodes = require('./responseCodeCounter');

// Compute the recent statistics of a given website, over the given duration
async function computeStatistics(websiteName, duration) {
  // Get current date to compute recent statistics
  const end = Date.now();
  // Get the logs of the website between the interval
  const logs = await getLogs(websiteName, end - duration, end);
  // Compute statistics of the logs
  const availability = await computeAvailability(logs);
  const maxResponseTime = await computeMaxResponseTime(logs);
  const averageResponseTime = await computeAverageResponseTime(logs);
  const responseCodes = await countResponseCodes(logs);
  // Send statistics to front
  const statistics = {
    availability,
    maxResponseTime,
    averageResponseTime,
    responseCodes,
  };
  // Display statistics in back console
  console.log(`Statistics of ${websiteName} for the last ${(duration) / 1000} seconds`);
  console.log(`Average availability: ${availability}`);
  console.log(`Maximum response time: ${maxResponseTime}`);
  console.log(`Average response time: ${averageResponseTime}`);
  Object.entries(responseCodes).map((code) => {
    console.log(`Number of HTTP status ${code[0]} occurences: ${code[1]}`);
  });
  console.log('');
  return statistics;
}


async computeAllStatistics() {
  // Get all websites
  const websites = await Website.find().select('name');
  // Check website availability at regular intervals, given by the checkInterval field
  const stats = websites.map(website => computeStatistics(website.name, duration));
}

module.exports = computeStatistics;

