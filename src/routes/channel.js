
var db = require('nano')('http://ryan-server:5984/pound'),
    irc = require('../irc').client;

exports.attach = function attach (router) {
    
    // get requests
    router.get('/channel', listChannels);
    
    // post requests
    router.post('/channel', joinChannel);
    
};

function listChannels (req, res) {
    
    // respond with a list of all channels
    return res.json(irc.chans);
    
};

function joinChannel (req, res) {

    // join the specified channel
    irc.join(req.body.channel);

    // respond with an accepted status
    return res.send(202);

};
