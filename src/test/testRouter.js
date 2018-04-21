// Import node modules
const express = require('express');
const { cosResponse, randomResponse } = require('./testController');

// Create router
const router = new express.Router();

// Set up routes
router.route('/cos').get(cosResponse);
router.route('/random').get(randomResponse);

module.exports = router;

