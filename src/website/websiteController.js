// Copyright (C) 2018 Quentin VERLHAC

// Import node package modules

const { Website } = require('../database/database');

async function addWebsite(req, res, next) {
  try {
    const website = new Website({
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


module.exports = {
  addWebsite,
};

