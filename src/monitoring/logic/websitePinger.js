// Import node modules
const axios = require('axios');
const { Log } = require('../../database/database');

// This function sends a request to the specified website to check if it is available
function pingWebsite(website) {
  try {
    // Save beginning time to compute response time
    const beginningTime = Date.now();
    // Send the request with a timeout of 10 seconds
    axios.get(website.url, { timeout: 10000 })
      .then(async (response) => {
        // Successful response, everything is fine
        // Get the reception time to compute response time
        const receptionTime = Date.now();
        // Add the information to the website check list
        // Success field is set to true to show the response was successful
        const log = new Log({
          website: website._id,
          dateTimestamp: receptionTime,
          success: true,
          responseTime: receptionTime - beginningTime,
          responseCode: response.status,
        });
        // Save the log in database
        await log.save();
      })
      .catch(async (error) => {
        // There is an error:
        // Either the website sent an error response or it didn't send any response
        // Get the reception time to compute response time, if there is a response
        const receptionTime = Date.now();
        let responseCode;
        let responseTime;
        if (error.response) {
          // If there is a response, get its code and compute its response time
          responseCode = error.response.status;
          responseTime = receptionTime - beginningTime;
        }
        // Add the information to the website check list
        // Success field is set to false to show the response wasn't successful
        // If there wasn't any response, responseTime and responseCode will be undefined
        // Their fields in the database will be empty
        const log = new Log({
          website: website._id,
          dateTimestamp: receptionTime,
          success: false,
          responseTime,
          responseCode,
        });
        // Save the log in database
        await log.save();
      });
  } catch (err) {
    console.error(err);
  }
}

module.exports = pingWebsite;

