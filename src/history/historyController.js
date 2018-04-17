// Import node modules
const { Website, History } = require('../database/database');
const getLogs = require('../log/logGetter');
const computeAvailability = require('../statistics/logic/availabilityComputer');

async function getAlerts(req, res, next) {
  try {
    // Measure current date
    const now = Date.now();
    // Get every websites
    const websites = await Website.find();
    const alerts = websites.map(async (website) => {
      // Get all logs within last 2 minutes
      const logs = await getLogs(website, now - 120000, now);
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
        alert.save();
        // Return the alert
        return alert;
      }
      // Else, return nothing
      return null;
    });
    // Send all the alerts
    res.send(alerts);
  } catch (err) {
    next(err);
  }
}

async function getHistory(req, res, next) {
  try {
    // Get all history until date timestamp
    const history = await History.find({ dateTimestamp: { $gt: parseInt(req.params.timestamp) } }).populate();
    res.send(history);
  } catch (err) {
    next(err);
  }
}

async function addToHistory(event) {
  const history = await new History(event);
  history.save();
}

module.exports = getHistory;

