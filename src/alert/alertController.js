// Import node modules
const { Alert } = require('../database/database');

// This function get the history from the given timestamp date to the current date
async function getHistory(req, res, next) {
  try {
    // Get all history until date timestamp
    const history = await Alert.find({ dateTimestamp: { $gt: parseInt(req.params.timestamp) } }).populate('website');
    res.send(history);
  } catch (err) {
    next(err, req, res, next);
  }
}

module.exports = getHistory;

