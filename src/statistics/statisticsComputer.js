// Import node modules
const { Log } = require('../database/database');
const getLogs = require('../misc/logGetter');
const computeAvailability = require('./availabilityComputer');
const { computeMaxResponseTime, computeAverageResponseTime } = require('./responseTimeComputer');
const countResponseCodes = require('./responseCodeCounter');

async function computeStatistics(websiteName, beginning, end) {
  // Get the logs of the website between the interval
  const logs = await getLogs(websiteName, beginning, end);
  // Compute statistics
  const averageAvailability = await computeAvailability(logs);
  const maxResponseTime = await computeMaxResponseTime(logs);
  const averageResponseTime = await computeAverageResponseTime(logs);
  const responseCodes = await countResponseCodes(logs);
  // Display statistics
  console.log(`Statistics of ${websiteName} for the last ${(end - beginning) / 1000} seconds`);
  console.log(`Average availability: ${averageAvailability}`);
  console.log(`Maximum response time: ${maxResponseTime}`);
  console.log(`Average response time: ${averageResponseTime}`);
  Object.entries(responseCodes).map((code) => {
    console.log(`Number of HTTP status ${code[0]} occurences: ${code[1]}`);
  });
  console.log('');
}

module.exports = computeStatistics;

