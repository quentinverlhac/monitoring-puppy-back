// Import node modules
const logGetter = require('../log/logGetter');

// This function gets a website logs between a beginning and an end date
// It uses the logGetter logic to handle the request
async function getLogs(req, res, next) {
  try {
    const logs = await logGetter(req.params.website, req.params.beginning, req.params.end);
    res.send(logs);
  } catch (err) {
    next(err, req, res, next);
  }
}

module.exports = {
  getLogs,
};

