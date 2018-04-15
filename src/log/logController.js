// Import node modules
const { Log } = require('../database/database');

async function getLogs(req, res, next) {
  try {
    const logs = await Log.find({
      dateTimestamp: { $gt: parseInt(req.params.beginning), $lt: parseInt(req.params.end) },
    }).populate('website');
    res.send(logs.filter(log => log.website.name === req.params.website));
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getLogs,
};

