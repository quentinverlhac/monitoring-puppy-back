// Import node modules
const { History } = require('../database/database');
const getLogs = require('../log/logGetter');
const computeAvailability = require('../statistics/logic/availabilityComputer');


async function checkAvailability(website, duration, alertManager) {
  // Measure current date
  const now = Date.now();
  // Get all logs within last 2 minutes
  const logs = await getLogs(website, now - duration, now);
  // Compute availability of the logs
  const availability = computeAvailability(logs);
  // If there is a breakthrough in the website situation
  if ((availability < 0.8 && !website.isDown) || (availability >= 0.8 && website.isDown)) {
    // Change the website situation in bdd
    website.isDown = !website.isDown;
    await website.save();
    // Create an alert
    const alert = new History({
      status: (website.isDown ? 'down' : 'up'),
      availability,
      dateTimestamp: now,
    });
    await alert.save();
    // Send the alert
    alertManager.sendAlert(alert);
  }
}

module.exports = checkAvailability;
