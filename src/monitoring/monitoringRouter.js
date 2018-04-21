// Import node modules
const express = require('express');
const {
  runMonitoring,
  stopMonitoring,
} = require('./monitoringController');
const handleError = require('../misc/errorHandler');

// Create router
const router = new express.Router();

// Set up routes
router.route('/run')
  .get(runMonitoring);
router.route('/stop')
  .get(stopMonitoring);
router.use(handleError);

// Export router
module.exports = router;

// Write API documentation
