
var db = require('nano')('http://raidbossanalytics.com:5984/pound'),
    irc = require('../irc').client;

exports.attach = function attach (router) {
    
    // get requests
    router.get('/message', listMessages);
    
    // post requests
    router.post('/message', createMessage);
    
};

function listMessages (req, res) {
    
    // specify the default params for the query
    var params = {

        limit: 25,
        descending: true

    };

    if (req.query.endkey)
        params.endkey = req.query.endkey;

    if (req.query.startkey)
        params.startkey = req.query.startkey;

    db.view('pound', 'messages-by-id', params, function (err, messages) {
        
        // error on failure
        if (err) return res.send(500);
        
        if (params.endkey && messages.rows.length > 0)
            messages.rows.splice(messages.rows.length - 1, 1);

        // messages on success
        return res.json(messages.rows);
        
    });
    
};

function createMessage (req, res) {
    
    // send the message to irc
    irc.say('##', req.body.message);
    
    return res.json({ ok: true });
    
};
