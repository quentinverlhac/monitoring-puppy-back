// Import node modules
const { Alert } = require('../database/database');

async function getHistory(req, res, next) {
  try {
    // Get all history until date timestamp
    const history = await Alert.find({ dateTimestamp: { $gt: parseInt(req.params.timestamp) } }).populate('website');
    res.send(history);
  } catch (err) {
    next(err, req, res, next);
  }
}

async function addToHistory(event) {
  const history = await new Alert(event);
  history.save();
}

module.exports = getHistory;

