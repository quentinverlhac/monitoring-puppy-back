// Import node modules
const express = require('express');
const getHistory = require('./alertController');
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

/**
 * @api {get} api/alert/:beginning getHistory
 * @apiName getHistory
 * @apiGroup alert
 * @apiDescription Get the history that was written since the beginning date.
 * @apiParam (URL parameters) {Number} timestamp The beginning timestamp date
 * @apiSuccess (Response field) {Object[]} data The response array of objects
 * @apiSuccess (Response field) {String} data._id The id of the log
 * @apiSuccess (Response field) {String} data.status A String indicating the status of the alert (down or up)
 * @apiSuccess (Response field) {Number} data.availability The average availability of the website for the last two minutes at the moment of the alert
 * @apiSuccess (Response field) {Number} data.dateTimestamp An integer representing the date of the alert as the number of milliseconds since the 1st Jan 1970
 * @apiSuccess (Response field) {Object} data.website The website associated to the log
 * @apiSuccess (Response field) {String} data.website._id The _id of the website
 * @apiSuccess (Response field) {String} data.website.name The name of the website
 * @apiSuccess (Response field) {String} data.website.url The url of the website
 * @apiSuccess (Response field) {Number} data.website.checkInterval The time interval between each availability check (in seconds)
 * @apiSuccess (Response field) {Boolean} data.website.isDown A boolean indicating if the website was down last time an alert was sent
 * @apiVersion 0.1.0
 */
