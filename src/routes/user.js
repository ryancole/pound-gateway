
var irc = require('../irc').client;

exports.attach = function attach (router) {
    
    // get requests
    router.get('/user', whoami);
    
};

function whoami (req, res) {
    
    return res.json({ nick: irc.nick });
    
};
