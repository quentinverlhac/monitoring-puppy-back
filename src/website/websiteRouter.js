// Copyright (C) 2018 Quentin VERLHAC

// Import node modules
const express = require('express');
const { addWebsite } = require('./websiteController');
const handleError = require('../misc/errorHandler');

// Create router
const router = new express.Router();

// Set up routes
router.route('/').post(addWebsite);
router.use(handleError);

// Export router
module.exports = router;

