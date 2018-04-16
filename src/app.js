// Import node modules
// Instantiate express app
const app = require('express')();
// Set up http server with app
const server = require('http').Server(app);
const bodyParser = require('body-parser');
const websiteRouter = require('./website/websiteRouter');
const monitoringRouter = require('./monitoring/monitoringRouter');
const logRouter = require('./log/logRouter');

// Use body parser for parsing the body of http requests to json objets
app.use(bodyParser.json());

app.use('/api/website', websiteRouter);
app.use('/api/monitoring', monitoringRouter);
app.use('/api/log', logRouter);

// Exports
module.exports = server;
