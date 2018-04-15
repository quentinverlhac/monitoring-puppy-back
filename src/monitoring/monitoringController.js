// Import node modules
const { startChecking, stopChecking } = require('../misc/checkingManager');

async function runMonitoring(req, res, next) {
  try {
    console.log('Monitoring is running');
    // Start checking websites
    startChecking();
    res.send('Monitoring is running');
  } catch (err) {
    next(err);
  }
}

async function stopMonitoring(req, res, next) {
  try {
    console.log('Monitoring stopped');
    // Stop checking websites
    stopChecking();
    res.send('Monitoring stopped');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  runMonitoring,
  stopMonitoring,
};

