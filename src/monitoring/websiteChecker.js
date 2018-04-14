// Import node modules
const axios = require('axios');

// This function sends a request to the specified website to check if it is available.
function checkWebsite(website) {
  try {
    // Save beginning time to compute response time.
    const beginningTime = Date.now();
    // Send the request with a timeout of 10 seconds.
    axios.get(website.url, { timeout: 1 })
      .then(async (response) => {
        // Success, everything is fine
        const receptionTime = Date.now();
        // Add the information to the website check list
        website.checkList.push({
          date: receptionTime,
          answered: true,
          responseTime: receptionTime - beginningTime,
          responseCode: response.status,
        });
        await website.save();
      })
      .catch(async (error) => {
        // There is an error
        const receptionTime = Date.now();
        let responseCode;
        let responseTime;
        if (error.response) {
          // If there is a response, get its code and its time
          responseCode = error.response.status;
          responseTime = receptionTime - beginningTime;
        }
        // Add the information to the website check list
        website.checkList.push({
          date: receptionTime,
          answered: false,
          responseTime,
          responseCode,
        });
        await website.save();
      });
  } catch (err) {
    console.error(err);
  }
}

module.exports = checkWebsite;

