// Import node package modules

const { Website } = require('../database/database');

async function addWebsite(req, res, next) {
  try {
    const website = await new Website({
      name: req.body.name,
      url: req.body.url,
      checkInterval: req.body.checkInterval,
    });
    // Save the website
    website.save();
    res.send(website);
  } catch (err) {
    next(err);
  }
}

async function getAllWebsites(req, res, next) {
  try {
    // Get every websites, without their logs
    const websites = await Website.find().select('name url checkInterval -_id');
    res.send(websites);
  } catch (err) {
    next(err);
  }
}

async function updateWebsite(req, res, next) {
  try {
    // Find the website to update with its id
    const website = await Website.findOneAndUpdate({ name: req.params.name }, { $set: req.body }, { new: true }).select('name url checkInterval -_id');
    res.send(website);
  } catch (err) {
    next(err);
  }
}

async function deleteWebsite(req, res, next) {
  try {
    // Find the website to delete with its id
    const website = await Website.findOneAndRemove({ name: req.params.name }).select('name url checkInterval -_id');
    res.send(website);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addWebsite,
  getAllWebsites,
  updateWebsite,
  deleteWebsite,
};

