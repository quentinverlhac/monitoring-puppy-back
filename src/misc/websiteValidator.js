// Import node modules
const { Website } = require('../database/database');

async function validateWebsite(req, res, next) {
  try {
    let website = await Website.findOne({ name: req.body.name });
    if (website != null) {
      res.status(400).send('Error: website name already used');
    }
    website = await Website.findOne({ url: req.body.url });
    if (website != null) {
      res.status(400).send('Error: website url already used');
    }
    next();
  } catch (err) {
    next(err, req, res, next);
  }
}

module.exports = validateWebsite;

