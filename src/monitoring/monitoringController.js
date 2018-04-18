// Import node modules
const pingManager = require('./PingManager');

async function runMonitoring(req, res, next) {
  try {
    console.log('Ping is running');
    // Start checking websites
    pingManager.startPing();
    res.send('Ping is running');
  } catch (err) {
    next(err);
  }
}

async function stopMonitoring(req, res, next) {
  try {
    console.log('Ping stopped');
    // Stop checking websites
    pingManager.stopPing();
    res.send('Ping stopped');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  runMonitoring,
  stopMonitoring,
};

