// Import node modules
const { Log } = require('../database/database');

async function getLogs(req, res, next) {
  try {
    console.log(req.params);
    const logs = await Log.find({
      dateTimestamp: { $gt: parseInt(req.params.beginning), $lt: parseInt(req.params.end) },
    });
    res.send(logs);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getLogs,
};

