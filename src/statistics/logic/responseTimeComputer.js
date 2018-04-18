// Compute the max response time of a website for the given logs array
async function computeMaxResponseTime(logs) {
  let maxResponseTime = 0;
  logs.map((log) => {
    if (log.responseTime) {
      // If the request received an answer before timeout
      // Set the new response time to the greater of the current response time
      // and the response time of this log
      maxResponseTime = Math.max(maxResponseTime, log.responseTime);
    }
    // If there was a request without response, it is ignored
  });
  // Return the max response time in the time interval
  return maxResponseTime;
}

// Compute the average response time of a website for the given logs array
async function computeAverageResponseTime(logs) {
  let sumOfResponseTime = 0;
  logs.map((log) => {
    if (log.responseTime) {
      // If the request received an answer before timeout
      // Add it to the sum of response time
      sumOfResponseTime += log.responseTime;
    }
    // If there was a request without response, it is ignored
  });
  // Return the average response time in the time interval
  return sumOfResponseTime / logs.length;
}

module.exports = {
  computeMaxResponseTime,
  computeAverageResponseTime,
};
