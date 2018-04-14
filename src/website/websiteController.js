// Copyright (C) 2018 Quentin VERLHAC

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
    const websites = await Website.find().select('-checkList');
    res.send(websites);
  } catch (err) {
    next(err);
  }
}

async function deleteWebsite(req, res, next) {
  try {
    // Find the website to delete with its id
    const website = await Website.findOneAndRemove({ _id: req.params.id });
    res.send(website);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  addWebsite,
  getAllWebsites,
  deleteWebsite,
};

