// Import node modules
const { Alert } = require('../../database/database');
const getLogs = require('../../log/logGetter');
const computeAvailability = require('../../statistics/logic/availabilityComputer');


async function checkAvailability(website, duration, alertManager) {
  // Measure current date
  const now = Date.now();
  // Get all logs within last 2 minutes
  const logs = await getLogs(website.name, now - duration, now);
  // Compute availability of the logs
  const availability = await computeAvailability(logs);
  // If there is a breakthrough in the website situation
  if ((availability < 0.8 && !website.isDown) || (availability >= 0.8 && website.isDown)) {
    // Change the website situation in bdd
    website.isDown = !website.isDown;
    await website.save();
    // Create an alert
    const alert = new Alert({
      website: website._id,
      status: (website.isDown ? 'down' : 'up'),
      availability,
      dateTimestamp: now,
    });
    await alert.save();
    await alert.populate('website').execPopulate();
    // Send the alert
    alertManager.sendAlert(alert);
  }
}

module.exports = checkAvailability;
