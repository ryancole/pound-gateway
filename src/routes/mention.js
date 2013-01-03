
var db = require('nano')('http://raidbossanalytics.com:5984/pound');

exports.attach = function attach (router) {
    
    // get requests
    router.get('/mention', listMentions);
    
};

function listMentions (req, res) {
    
    // specify the default params for the query
    var params = {

        limit: 25,
        descending: true

    };

    if (req.query.endkey)
        params.endkey = req.query.endkey;

    if (req.query.startkey)
        params.startkey = req.query.startkey;

    db.view('pound', 'mentions-by-id', params, function (err, mentions) {
        
        // error on failure
        if (err) return res.send(500);
        
        if (params.endkey && mentions.rows.length > 0)
            mentions.rows.splice(mentions.rows.length - 1, 1);

        // mentions on success
        return res.json(mentions.rows);
        
    });
    
};
