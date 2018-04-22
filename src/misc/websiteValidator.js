// Import node modules
const { Website } = require('../database/database');

// This is a validator function which checks if the given name or url are already used
// It works for both addition and update
async function validateWebsiteBody(req, res, next) {
  try {
    // Write a regex to check url
    const httpPattern = /^(f|ht)tps?:\/\//;
    // Check every that existing body field has the right format
    if (req.body.url && !httpPattern.test(req.body.url)) {
      // The url doesn't begin with the http scheme
      res.status(400).send(`Error: website url "${req.body.url}" must be a url beginning with the http scheme`);
    } else if (req.body.checkInterval && (isNaN(req.body.checkInterval) || req.body.checkInterval > 2e10)) {
      // The check interval is not a number or is too high (more than 100 years)
      res.status(400).send(`Error: website check interval "${req.body.checkInterval}" must be a number less than 20 billion seconds`);
    } else {
      // Test if the name is already taken
      let website = await Website.findOne({ name: req.body.name });
      if (website != null && req.params.name !== website.name) {
        // The name is taken by an other website
        // In case of update, we make sure it is not the name of the updated website
        res.status(400).send(`Error: website name "${req.body.name}" already used`);
      } else {
        // Test if the url is already taken
        website = await Website.findOne({ url: req.body.url });
        if (website != null && req.params.name !== website.name) {
          // The url is taken by an other website
          // In case of update, we make sure it is not the url of the updated website
          res.status(400).send(`Error: website url "${req.body.url}" already used`);
        } else {
          // Everything is fine, let's complete the request !
          next();
        }
      }
    }
  } catch (err) {
    next(err, req, res, next);
  }
}

// This is a validator function which checks if the website given in the url exists
// It works for both update and delete of the website
async function validateWebsiteParams(req, res, next) {
  try {
    // Test if the name exists
    const website = await Website.findOne({ name: req.params.name });
    if (!website) {
      // The website doesn't exist
      res.status(400).send(`Error: website ${req.params.name} doesn't exist`);
    } else {
      // Everything is fine, let's complete the request !
      next();
    }
  } catch (err) {
    next(err, req, res, next);
  }
}

module.exports = {
  validateWebsiteBody,
  validateWebsiteParams,
};

