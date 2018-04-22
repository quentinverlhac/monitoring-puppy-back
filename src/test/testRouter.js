// Import node modules
const express = require('express');
const { cosResponse, randomResponse } = require('./testController');

// Create router
const router = new express.Router();

// Set up routes
router.route('/cos').get(cosResponse);
router.route('/random').get(randomResponse);

module.exports = router;

/**
 * @api {get} api/test/cos cosResponse
 * @apiName cosResponse
 * @apiGroup test
 * @apiDescription A route that randomly send successful or error responses, following a cosinus threshold. It simulates a website that periodically goes down.
 * @apiVersion 0.1.0
 */

/**
 * @api {get} api/test/random randomResponse
 * @apiName randomResponse
 * @apiGroup test
 * @apiDescription A route that send randomly chosen status codes. It is used to test the count of status codes.
 * @apiVersion 0.1.0
 */
