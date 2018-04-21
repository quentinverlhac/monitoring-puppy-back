// Compute the availability of a website for the given logs array
async function computeAvailability(logs) {
  // Compute the number of successful request
  let availableLogs = 0;
  logs.map((log) => {
    if (log.success) {
      // If the request received a successful answer
      availableLogs += 1;
    }
  });
  // Return the average availability in the time interval
  return availableLogs / logs.length;
}

module.exports = computeAvailability;

