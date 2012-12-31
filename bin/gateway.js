
var irc = require('../src/irc'),
    http = require('../src/http');

function initialize(argv) {
    
    // initialize the irc client
    var client = irc.client;
    
    // initialize the web server
    var server = http.createServer();
    
    // begin handling web requests
    server.listen(8080, function () {
        
        console.log('Accepting incoming requests: ' + server.settings.env);
        
    });
    
};

initialize(process.argv);
