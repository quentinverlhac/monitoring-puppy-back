// Import node modules
// Instantiate express app
const app = require('express')();
// Set up http server with app
const server = require('http').Server(app);
// Instantiate socket.io with http serveur
const io = require('socket.io')(server);
const bodyParser = require('body-parser');
const websiteRouter = require('./website/websiteRouter');
const monitoringRouter = require('./monitoring/monitoringRouter');
const logRouter = require('./log/logRouter');
const statisticsRouter = require('./statistics/statisticRouter');
const historyRouter = require('./history/historyRouter');
const StatisticsManager = require('./statistics/StatisticManager');

// Use body parser for parsing the body of http requests to json objets
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('a user connected');
  const statisticsManager = new StatisticsManager(socket);
  statisticsManager.startStatisticsComputing(10000, 600000);
  statisticsManager.startStatisticsComputing(60000, 3600000);
  socket.on('disconnect', () => {
    statisticsManager.stopStatisticsComputing();
    console.log('user disconnected');
  });
});

app.use('/api/website', websiteRouter);
app.use('/api/monitoring', monitoringRouter);
app.use('/api/log', logRouter);
app.use('/api/statistic', statisticsRouter);
app.use('/api/history', historyRouter);

// Exports
module.exports = server;
