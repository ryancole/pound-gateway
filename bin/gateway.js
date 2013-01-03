
var http = require('../src/http'),
    nano = require('nano')('http://raidbossanalytics.com:5984');

function initialize (argv) {
    
    bootstrap(function (err, success) {
        
        // error on failure
        if (err) return console.log(err);
        
        // initialize the web server
        var server = http.createServer();
        
        // begin handling web requests
        server.listen(8080, function () {
            
            console.log('Accepting incoming requests: ' + server.settings.env);
            
        });
        
    });
    
};

function bootstrap (callback) {
    
    console.log('Making sure the required database exists ...');
    
    nano.db.list(function (err, body) {
        
        // check if the database exists
        if (body.indexOf('pound') > -1)
            return callback(null, true);
        
        console.log('The database was not found and will now be created ...');
        
        // create the database
        nano.db.create('pound', function (err, body) {
            
            // error on failure
            if (err) return callback(err);
            
            // get reference to the database
            var pound = nano.use('pound');
            
            // format the design document
            var designdocument = {
                "language": "javascript",
                "views": {
                    "messages-by-id": {
                        "map": "function (doc) { if (doc.type == 'message') emit(doc._id, doc); }"
                    },
                    "mentions-by-id": {
                        "map": "function (doc) { if (doc.type == 'message' && doc.highlighted == true) emit(doc._id, doc); }"
                    }
                }
            };
            
            // insert the design document
            pound.insert(designdocument, '_design/pound', function (err, body) {
                
                // error on failure
                if (err) return callback(err);
                
                // success on ... success
                return callback(null, true);
                
            });
            
        });
        
    });
    
};

initialize(process.argv);
