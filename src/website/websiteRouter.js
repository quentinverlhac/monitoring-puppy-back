// Copyright (C) 2018 Quentin VERLHAC

// Import node modules
const express = require('express');
const {
  addWebsite, getAllWebsites, updateWebsite, deleteWebsite,
} = require('./websiteController');
const handleError = require('../misc/errorHandler');

// Create router
const router = new express.Router();

// Set up routes
router.route('/')
  .post(addWebsite)
  .get(getAllWebsites);
router.route('/:name')
  .put(updateWebsite)
  .delete(deleteWebsite);
router.use(handleError);

// Export router
module.exports = router;

// Write API documentation

/**
 * @apiDefine responseWebsite
 * @apiSuccess (Response field) {String} res.name The name of the website
 * @apiSuccess (Response field) {String} res.url The url of the website
 * @apiSuccess (Response field) {Number} res.checkInterval The time interval between each availability check (in seconds)
 */

/**
 * @api {post} api/website/ addWebsite
 * @apiName addWebsite
 * @apiGroup Website
 * @apiDescription Add a new website to monitoring
 * @apiParam (Body parameters) {String} name The name of the website (must be unique)
 * @apiParam (Body parameters) {String} url The url of the website (must be unique)
 * @apiParam (Body parameters) {Number} checkInterval The time interval between each availability check (in seconds)
 * @apiSuccess (Response field) {Object} res The response is an object
 * @apiUse responseWebsite
 * @apiVersion 0.1.0
 */

/**
 * @api {get} api/website/ getAllWebsite
 * @apiName getAllWebsite
 * @apiGroup Website
 * @apiDescription Get all monitored websites
 * @apiSuccess (Response field) {Object[]} res The response is an array of objects
 * @apiUse responseWebsite
 * @apiVersion 0.1.0
 */

/**
 * @api {post} api/website/:name updateWebsite
 * @apiName updateWebsite
 * @apiGroup Website
 * @apiDescription Update the url named website
 * @apiParam (Body parameters) {String} [name] The name of the website (must be unique)
 * @apiParam (Body parameters) {String} [url] The url of the website (must be unique)
 * @apiParam (Body parameters) {Number} [checkInterval] The time interval between each availability check (in seconds)
 * @apiSuccess (Response field) {Object} res The response is an object
 * @apiUse responseWebsite
 * @apiVersion 0.1.0
 */

/**
 * @api {delete} api/website/:name deleteWebsite
 * @apiName deleteWebsite
 * @apiGroup Website
 * @apiDescription Delete the url named website
 * @apiSuccess (Response field) {Object} res The response is an object
 * @apiUse responseWebsite
 * @apiVersion 0.1.0
 */
