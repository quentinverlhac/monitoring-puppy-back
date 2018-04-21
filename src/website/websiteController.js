// Import node modules
const { Website } = require('../database/database');

// This function add a monitored website to the database
async function addWebsite(req, res, next) {
  try {
    // Create a website instance using the parameters given in the body of the request
    const website = await new Website({
      name: req.body.name,
      url: req.body.url,
      checkInterval: req.body.checkInterval,
      isDown: false,
    });
    // Save the website in the database
    website.save();
    // Send the created website json object in the response
    res.send(website);
  } catch (err) {
    next(err, req, res, next);
  }
}

// This function get all monitored websites from the database and send them to the front
async function getAllWebsites(req, res, next) {
  try {
    // Get every websites, without their logs and their id
    const websites = await Website.find().select('name url checkInterval -_id');
    // Send the websites json object in the response
    res.send(websites);
  } catch (err) {
    next(err, req, res, next);
  }
}

// This function update a monitored website in the database
async function updateWebsite(req, res, next) {
  try {
    // The website is found by its name rather than its id
    // Indeed, it is easier for a human to work with names
    // The name is given as a url parameter
    // The website is updated on the fly with body parameters
    const website = await Website
      .findOneAndUpdate({ name: req.params.name }, { $set: req.body }, { new: true })
      .select('name url checkInterval -_id');
    // Send the website json object in the response, without its logs and its id
    res.send(website);
  } catch (err) {
    next(err, req, res, next);
  }
}

// This function delete a monitored website in the database
async function deleteWebsite(req, res, next) {
  try {
    // The website is found by its name rather than its id
    // Indeed, it is easier for a human to work with names
    // The name is given as a url parameter
    // The website is deleted on the fly
    const website = await Website
      .findOneAndRemove({ name: req.params.name })
      .select('name url checkInterval -_id');
    // Send the website json object in the response, without its logs and its id
    res.send(website);
  } catch (err) {
    next(err, req, res, next);
  }
}

// Export controller functions
module.exports = {
  addWebsite,
  getAllWebsites,
  updateWebsite,
  deleteWebsite,
};

