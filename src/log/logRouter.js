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

/**
 * @api {get} api/log/:website/:beginning/:end getLogs
 * @apiName getLogs
 * @apiGroup log
 * @apiDescription Get the website logs that were written between the beginning and the end date. This route is used for development purposes.
 * @apiParam (URL parameters) {String} website The name of the website
 * @apiParam (URL parameters) {Number} beginning The beginning timestamp date
 * @apiParam (URL parameters) {Number} end The end timestamp date
 * @apiSuccess (Response field) {Object[]} data The response object
 * @apiSuccess (Response field) {String} data._id The id of the log
 * @apiSuccess (Response field) {Number} data.dateTimestamp An integer representing the date of the log as the number of milliseconds since the 1st Jan 1970
 * @apiSuccess (Response field) {Boolean} data.success A boolean indicating if the ping was successfully answered
 * @apiSuccess (Response field) {Object} data.website The website associated to the log
 * @apiSuccess (Response field) {String} data.website._id The _id of the website
 * @apiSuccess (Response field) {String} data.website.name The name of the website
 * @apiSuccess (Response field) {String} data.website.url The url of the website
 * @apiSuccess (Response field) {Number} data.website.checkInterval The time interval between each availability check (in seconds)
 * @apiSuccess (Response field) {Boolean} data.website.isDown A boolean indicating if the website was down last time an alert was sent
 * @apiVersion 0.1.0
 */
