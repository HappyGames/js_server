var pomelo = require('pomelo');
var httpServer = require('./app/servers/connector/httpServer');
var mail_wrapper = require('./app/mail/mail_wrapper');
var activity_wrapper = require('./app/activity/activity_wrapper');
var statistics_wrapper = require('./app/statistics/statistics_wrapper');
/**
 * Init app for client.
 */
var app = pomelo.createApp();
app.set('name', 'srv');

// app configuration
app.configure('production|development', 'connector', function(){
  app.set('connectorConfig',
    {
      connector : pomelo.connectors.hybridconnector,
      heartbeat : 3,
      useDict : true,
      useProtobuf : true
    });
    app.loadConfig('redis', app.getBase() + '/config/redis.json');
    console.log("config load for redis  %s", app.getBase() + '/config/redis.json');
    require('./app/nosql/redis_pools').configure(app.get('redis'));

    //  create http server
    var http = new httpServer(app.get('curServer').host,app.get('curServer').httpClientPort);
    http.createHttpServer();
    app.set('httpServer',http);

    //  for mail handler
    var __mail_wrapper = new mail_wrapper(require('./config/mail'));
    app.set('mail_wrapper',__mail_wrapper);

    //  for activity handler
    var __activity_wrapper = new activity_wrapper();
    app.set('activity_wrapper',__activity_wrapper);

    //  for statistics handler
    var __statistics_wrapper = new statistics_wrapper();
    app.set('statistics_wrapper',__statistics_wrapper);
});

// start app
app.start();

process.on('uncaughtException', function (err) {
  console.error(' Caught exception: ' + err.stack);
});