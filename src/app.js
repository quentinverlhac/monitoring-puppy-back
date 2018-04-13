// Copyright (C) 2018 Quentin VERLHAC

// Import node modules
const express = require('express');
const bodyParser = require('body-parser');
const websiteRouter = require('./website/websiteRouter');

// Instantiate express server
const app = express();

// Use body parser for parsing http requests
app.use(bodyParser.json());

app.use('/api/website', websiteRouter);

// Exports
module.exports = app;
