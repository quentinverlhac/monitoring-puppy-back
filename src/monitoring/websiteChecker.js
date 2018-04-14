// Import node modules
const axios = require('axios');

async function checkWebsite(website) {
  console.log(website);
  const response = await axios.get(website.url);
  website.checkList.push({
    date: Date.now(),
    answered: true,
    responseTime: 1,
    responseCode: response.status,
  });
}

module.exports = checkWebsite;

