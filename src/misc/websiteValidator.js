// Import node modules
const { Website } = require('../database/database');

// This is a validator function which checks if the given name or url are already used
// It works for both addition and update
async function validateWebsite(req, res, next) {
  try {
    // Test if the name is already taken
    let website = await Website.findOne({ name: req.body.name });
    if (website != null && req.params.name !== website.name) {
      // The name is taken by an other website
      // In case of update, we make sure it is not the name of the updated website
      res.status(400).send('Error: website name already used');
    }
    // Test if the url is already taken
    website = await Website.findOne({ url: req.body.url });
    if (website != null && req.params.name !== website.name) {
      // The url is taken by an other website
      // In case of update, we make sure it is not the url of the updated website
      res.status(400).send('Error: website url already used');
    }
    // Everything is fine, let's complete the request !
    next();
  } catch (err) {
    next(err, req, res, next);
  }
}

module.exports = validateWebsite;

