// Import node modules
const computeStatistics = require('./logic/statisticsComputer');

async function getStatistics(req, res, next) {
  try {
    const statistics = await computeStatistics(req.params.website, parseInt(req.params.duration));
    res.send(statistics);
  } catch (err) {
    next(err);
  }
}

module.exports = getStatistics;

