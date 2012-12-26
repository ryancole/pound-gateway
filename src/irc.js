
var irc = require('irc'),
    db = require('nano')('http://localhost:5984/pound');

// module exports
exports.createClient = function createClient (server, nick, options) {
    
    // init the irc client
    var client = new irc.Client(server, nick, options);
    
    // add a listener for received messages
    client.addListener('message', function (source, destination, msg) {
        
        // push the received message onto the message queue
        db.insert({
            
            type: 'message',
            message: msg,
            source: source,
            destination: destination,
            timestamp: new Date
            
        });
        
    });
    
    return client;
    
};
