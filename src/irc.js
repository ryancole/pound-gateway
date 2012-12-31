
var irc = require('irc'),
    db = require('nano')('http://ryan-server:5984/pound'),
    bridge = require('./bridge').bridge;

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
            timestamp: Math.floor(Date.now() / 1000)
            
        });
        
    });

    // listen for a message to send to irc
    bridge.on('send-message', function (message) {

        client.say('#beta', message.message);

    });
    
    return client;
    
};
