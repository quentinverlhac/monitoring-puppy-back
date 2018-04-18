// Compute the average response time of a website for the given logs array
async function countResponseCodes(logs) {
  const counter = {};
  // Instantiate null code (when request is not answered) to 0
  counter.null = 0;
  logs.map((log) => {
    if (log.responseCode) {
      // If the request received an answer with a responseCode
      // Increment its code in the counter
      if (counter[log.responseCode]) {
        counter[log.responseCode] += 1;
      } else {
        // The code isn't in the counter yet
        counter[log.responseCode] = 1;
      }
    } else {
      // If there was a request without response, it is count as a "null" code
      counter.null += 1;
    }
  });
  // Return the count of response codes in the time interval
  return counter;
}

module.exports = countResponseCodes;
