
var irc = require('../src/irc'),
    http = require('../src/http');

function initialize(argv) {
    
    // initialize the irc client
    var options = require(argv[2]),
        client = irc.createClient(options.irc.server, options.irc.nickname, options.irc.settings);
    
    // initialize the web server
    var server = http.createServer();
    
    // begin handling web requests
    server.listen(8080, function () {
        
        console.log('Accepting incoming requests: ' + server.settings.env);
        
    });
    
};

initialize(process.argv);
