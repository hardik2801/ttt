var requireConfig = require('./require-config');

global.appRequire = function(alias){
    return require(__dirname + '/' + requireConfig[alias.toLowerCase()]);
};
var config = appRequire('config');
var http = require('http');

var express = require('express');
var bodyParser = require('body-parser');

var routes = appRequire('routes');

var app = express();

app.use(bodyParser.json({ limit : '50mb' }));

routes(app);


var server = http.createServer(app);
server.listen(config.port, config.host, function(){
    console.log("Server started on " + config.host + " on port " + config.port);
});

// when the server is shutting down, it emits a SIGTERM event. this lets us clean up connections etc.
process.on('SIGTERM', function(){
    console.log('Server shutting down!!');
    mongoose.connection.close();
    process.exit(0);
});



