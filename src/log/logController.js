// Import node modules
const { Log } = require('../database/database');
const logGetter = require('./logGetter');

async function getLogs(req, res, next) {
  try {
    const logs = await logGetter(req.params.website, req.params.beginning, req.params.end);
    res.send(logs);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  getLogs,
};

