// Import node modules
const getLogs = require('../../log/logGetter');
const computeAvailability = require('./availabilityComputer');
const { computeMaxResponseTime, computeAverageResponseTime } = require('./responseTimeComputer');
const countResponseCodes = require('./responseCodeCounter');

// Compute the recent statistics of a given website, over the given duration
async function computeStatistics(website, duration, statisticsManager) {
  // Get current date to compute recent statistics
  const end = Date.now();
  // Get the logs of the website between the interval
  const logs = await getLogs(website.id, end - duration, end);
  // Compute statistics of the logs
  const availability = await computeAvailability(logs);
  const maxResponseTime = await computeMaxResponseTime(logs);
  const averageResponseTime = await computeAverageResponseTime(logs);
  const responseCodes = await countResponseCodes(logs);
  // Send statistics to front
  const statistics = {
    date: end,
    duration,
    websiteName: website.name,
    availability,
    maxResponseTime,
    averageResponseTime,
    responseCodes,
  };
  statisticsManager.sendStatistics(statistics);
}

module.exports = computeStatistics;

