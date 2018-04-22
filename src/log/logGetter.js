const { Log } = require('../database/database');

// Get logs of given website within time range
async function getLogs(websiteId, beginning, end) {
// Get all logs registered between beginning and end timestamps
  const logs = await Log.find({
    dateTimestamp: { $gt: parseInt(beginning), $lt: parseInt(end) },
  }).populate('website');
  // Return the logs that correspond to the given website
  return logs.filter(log => log.website && log.website.id === websiteId);
}

module.exports = getLogs;

