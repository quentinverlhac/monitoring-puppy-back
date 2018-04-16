// Import node modules
const express = require('express');
const { getStatistics } = require('./statisticController');
const handleError = require('../misc/errorHandler');

// Create router
const router = new express.Router();

// Set up routes
router.route('/:website/:duration')
  .get(getStatistics);
router.use(handleError);

// Export router
module.exports = router;

// Write API documentation
