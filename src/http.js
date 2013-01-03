
var express = require('express');

var routes = {
    
    users:  require('./routes/user'),
    channels: require('./routes/channel'),
    messages: require('./routes/message'),
    mentions: require('./routes/mention')
    
};

exports.createServer = function createServer () {
    
    // initalize http server
    var server = express();
    
    // specify middleware
    server.use(express.bodyParser());
    
    // attach router handlers
    routes.users.attach(server);
    routes.channels.attach(server);
    routes.messages.attach(server);
    routes.mentions.attach(server);
    
    // return server instance
    return server;
    
};
