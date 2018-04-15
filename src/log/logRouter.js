// Import node modules
const express = require('express');
const { getLogs } = require('./logController');
const handleError = require('../misc/errorHandler');

// Create router
const router = new express.Router();

// Set up routes
router.route('/:website/:beginning/:end')
  .get(getLogs);
router.use(handleError);

// Export router
module.exports = router;

// Write API documentation
