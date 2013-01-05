
var irc = require('../irc').client,
    db = require('nano')('http://raidbossanalytics.com:5984/pound'),
    underscore = require('underscore');

exports.attach = function attach (router) {
    
    // get requests
    router.get('/channel', listChannels);
    
    // post requests
    router.post('/channel', joinChannel);

    // delete requests
    router.delete('/channel', leaveChannel);
    
};

function listChannels (req, res) {
    
    return res.json(underscore.values(irc.chans));
    
};

function joinChannel (req, res) {

    irc.join(req.body.channel, function (nick, message) {

        return res.send(202, { success: true });

    });

};

function leaveChannel (req, res) {

    irc.part(req.query.channel, function (nick, reason, msg) {

        return res.send(202, { success: true });

    });

};
