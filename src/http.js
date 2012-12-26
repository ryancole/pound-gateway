
var express = require('express');

var routes = {
    
    messages: require('./routes/message')
    
};

exports.createServer = function createServer () {
    
    // initalize http server
    var server = express();
    
    // specify middleware
    server.use(express.bodyParser());
    
    // attach router handlers
    routes.messages.attach(server);
    
    // return server instance
    return server;
    
};
