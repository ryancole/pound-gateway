
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
    irc.say(req.body.recipient, req.body.message);

    // format the received message for the database
    var message = {

        type: 'message',
        message: req.body.message,
        source: irc.nick,
        highlighted: false,
        destination: req.body.recipient,
        timestamp: Math.floor(Date.now() / 1000)

    };

    // if this contains a nickname highlight make note of that
    if (req.body.message.toLowerCase().indexOf(irc.nick.toLowerCase()) > -1)
        message.highlighted = true;

    // write the message to the database
    db.insert(message, function (err, success) {

        return res.send(201, { success: true });

    });
    
};
