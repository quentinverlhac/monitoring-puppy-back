// Import node modules
const axios = require('axios');
const axiosTiming = require('axios-timing');
const { Website } = require('../database/database');

const intervals = [];

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

async function runMonitoring() {
  const websites = await Website.find().select('url checkInterval -_id');
  websites.map((website) => {
    const interval = setInterval(checkWebsite, website.checkInterval * 1000, website);
    intervals.push(interval);
  });
}

async function stopMonitoring() {
  intervals.map((interval) => {
    clearInterval(interval);
  });
}

module.exports = {
  runMonitoring,
  stopMonitoring,
};

