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

/**
 * @api {get} api/monitoring/run runMonitoring
 * @apiName runMonitoring
 * @apiGroup monitoring
 * @apiDescription Start the monitoring of websites in background. Websites will be pinged regularly, but statistics and alerts will not be sent.
 * @apiSuccess (Response field) {String} data A string saying 'Websites are now regularly ping'
 * @apiVersion 0.1.0
 */

/**
 * @api {get} api/monitoring/stop stopMonitoring
 * @apiName stopMonitoring
 * @apiGroup monitoring
 * @apiDescription Stop the monitoring of websites in background. Websites will stop being pinged regularly.
 * @apiSuccess (Response field) {String} data A string saying 'Websites ping stopped'
 * @apiVersion 0.1.0
 */
