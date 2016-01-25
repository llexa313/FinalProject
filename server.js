'use strict';

var express = require('express');

var app = express();

// set the static files location /
app.use('/', express.static('./public'));
app.use('/components', express.static('./bower_components'));
app.use('/app', express.static('app'));
app.use('/lang', express.static('./lang'));

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log('Server started. Open http://localhost:8080/!');
});
