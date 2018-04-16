// Import node modules
const express = require('express');
const getHistory = require('./historyController');
const handleError = require('../misc/errorHandler');

// Create router
const router = new express.Router();

// Set up routes
router.route('/:timestamp')
  .get(getHistory);
router.use(handleError);

// Export router
module.exports = router;

// Write API documentation
