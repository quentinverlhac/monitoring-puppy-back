// Import node modules
const pingManager = require('./PingManager');

// This function starts the ping of websites independently of the front socket connection
async function runMonitoring(req, res, next) {
  try {
    console.log('Websites are now regularly ping');
    // Tells the ping manager to start ping websites
    pingManager.startPing();
    // Send confirmation in response
    res.send('Websites are now regularly ping');
  } catch (err) {
    next(err, req, res, next);
  }
}

// This function stops the ping of websites
async function stopMonitoring(req, res, next) {
  try {
    // Tells the ping manager to stop ping websites
    pingManager.stopPing();
    console.log('Websites ping stopped');
    // Send confirmation in response
    res.send('Websites ping stopped');
  } catch (err) {
    next(err, req, res, next);
  }
}

// Export the controller function
module.exports = {
  runMonitoring,
  stopMonitoring,
};

