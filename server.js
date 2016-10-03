'use strict';

/*
 * Require dependences
 */
var express = require('express');

var app = express();
app.set('port', process.env.PORT || 3000);

/*
 * App config
 */
app.use(express.static(__dirname + '/assets'));
require('./configs/express')(app);
//require('./configs/connectdb').mongodb.init();

/*
 * Routers
 */
require('./routes')(app);

//Start server
var port = port || app.get('port');
app.listen(port, function() {
   console.log('Express started on http://localhost:%d; press Ctrl-C to terminate.', port);
});
