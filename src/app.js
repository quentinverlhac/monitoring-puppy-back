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
const alertRouter = require('./alert/alertRouter');
const pingManager = require('./monitoring/PingManager');
const StatisticsManager = require('./statistics/StatisticManager');
const AlertManager = require('./alert/AlertManager');
const testRouter = require('./test/testRouter');

// Use body parser for parsing the body of http requests to json objets
app.use(bodyParser.json());

io.on('connection', (socket) => {
  console.log('a user connected');
  const statisticsManager = new StatisticsManager(socket);
  const alertManager = new AlertManager(socket);
  pingManager.startPing();
  statisticsManager.startStatisticsComputing(10000, 600000);
  statisticsManager.startStatisticsComputing(60000, 3600000);
  alertManager.startWatching(1000, 120000);
  socket.on('disconnect', () => {
    alertManager.stopWatching();
    statisticsManager.stopStatisticsComputing();
    pingManager.stopPing();
    console.log('user disconnected');
  });
});

app.use('/api/website', websiteRouter);
app.use('/api/monitoring', monitoringRouter);
app.use('/api/log', logRouter);
app.use('/api/alert', alertRouter);
app.use('/api/test', testRouter);

// Exports
module.exports = server;
