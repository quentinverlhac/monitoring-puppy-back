// Import node modules
const { startChecking, stopChecking } = require('../misc/checkingManager');
const { startStatisticsComputing, stopStatisticsComputing } = require('../misc/statisticsManager');

async function runMonitoring(req, res, next) {
  try {
    console.log('Monitoring is running');
    // Start checking websites
    startChecking();
    startStatisticsComputing(10000, 600000);
    startStatisticsComputing(60000, 3600000);
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
    stopStatisticsComputing();
    res.send('Monitoring stopped');
  } catch (err) {
    next(err);
  }
}

module.exports = {
  runMonitoring,
  stopMonitoring,
};

