// Import node modules
const express = require('express');
const bodyParser = require('body-parser');
const websiteRouter = require('./website/websiteRouter');
const monitoringRouter = require('./monitoring/monitoringRouter');
const logRouter = require('./log/logRouter');

// Instantiate express server
const app = express();

// Use body parser for parsing http requests
app.use(bodyParser.json());

app.use('/api/website', websiteRouter);
app.use('/api/monitoring', monitoringRouter);
app.use('/api/log', logRouter);

// Exports
module.exports = app;
