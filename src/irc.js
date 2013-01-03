
var irc = require('irc'),
    db = require('nano')('http://raidbossanalytics.com:5984/pound'),
    options = require(process.argv[2]);

// export an active irc client
exports.client = createClient(options.irc.server, options.irc.nickname, options.irc.settings);

function createClient (server, nick, options) {
    
    // init the irc client
    var client = new irc.Client(server, nick, options);
    
    // add a listener for received messages
    client.addListener('message', function (source, destination, msg) {
        
        // format the received message for the database
        var message = {

            type: 'message',
            message: msg,
            source: source,
            highlighted: false,
            destination: destination,
            timestamp: Math.floor(Date.now() / 1000)

        };

        // if this contains a nickname highlight make note of that
        if (msg.toLowerCase().indexOf(client.nick.toLowerCase()) > -1)
            message.highlighted = true;

        // push the received message onto the message queue
        db.insert(message);
        
    });
    
    return client;
    
};
