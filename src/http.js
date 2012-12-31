
var express = require('express');

var routes = {
    
    channels: require('./routes/channel'),
    messages: require('./routes/message')
    
};

exports.createServer = function createServer () {
    
    // initalize http server
    var server = express();
    
    // specify middleware
    server.use(express.bodyParser());
    
    // attach router handlers
    routes.channels.attach(server);
    routes.messages.attach(server);
    
    // return server instance
    return server;
    
};
