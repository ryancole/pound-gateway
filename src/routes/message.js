
var db = require('nano')('http://localhost:5984/pound');

exports.attach = function attach (router) {
    
    // get requests
    router.get('/message', listMessages);
    
    // post requests
    router.post('/message', createMessage);
    
};

function listMessages (req, res) {
    
    db.view('pound', 'messages-by-id', function (err, messages) {
        
        // error on failure
        if (err) return res.send(500);
        
        // messages on success
        return res.json(messages.rows);
        
    });
    
};

function createMessage (req, res) {
    
    return res.send(501);
    
};
