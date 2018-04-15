// Compute the average response time of a website for the given logs array
async function countResponseCodes(logs) {
  const counter = {};
  // Instantiate null code (when request is answered) to 0
  counter.null = 0;
  logs.map((log) => {
    if (log.responseCode) {
      // If the request received an answer with a responseCode
      // Increment its code in the counter
      if (counter[log.responseCode]) {
        counter[log.responseCode] += 1;
      } else {
        counter[log.responseCode] = 1;
      }
    } else {
      // If there was a request without response, the average response time is set to infinity
      counter.null += 1;
    }
  });
  // Return the average response time in the time interval
  return counter;
}

module.exports = countResponseCodes;
