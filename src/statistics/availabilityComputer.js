const logGetter = require('../misc/logGetter');

// Compute the availability of a website for the given duration until the end date.
async function computeAvailability(website, duration, end) {
  // Get the logs of the website in the time interval
  const logs = await logGetter(website, end - duration, end);
  // Compute the number of successful request
  let availableLogs = 0;
  logs.map((log) => {
    if (log.answered && log.responseCode === '200') {
      // If the request received a successful answer
      availableLogs += 1;
    }
  });
  // Return the average availability in the time interval
  return availableLogs / logs.length;
}

module.exports = computeAvailability;

