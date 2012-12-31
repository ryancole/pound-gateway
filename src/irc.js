
var irc = require('irc'),
    db = require('nano')('http://ryan-server:5984/pound'),
    options = require(process.argv[2]);

// module exports
exports.client = createClient(options.irc.server, options.irc.nickname, options.irc.settings);

function createClient (server, nick, options) {
    
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
    
    return client;
    
};
