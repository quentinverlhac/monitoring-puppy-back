// Import node modules
const { History } = require('../database/database');

async function getHistory(req, res, next) {
  try {
    // Get all history until date timestamp
    const history = await History.find({ dateTimestamp: { $gt: parseInt(req.params.timestamp) } }).populate('website');
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

