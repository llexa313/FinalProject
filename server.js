'use strict';

var express = require('express'),
    NodeCache = require( "node-cache" );

var app = express(),
    cache = new NodeCache();


// set the static files location /
app.use('/', express.static('./public'));
app.use('/components', express.static('./bower_components'));
app.use('/app', express.static('app'));
app.use('/lang', express.static('./lang'));

app.get('/api/currencies', function(req, res) {
    var key = 'currenciesData',
        data = cache.get(key);

    if (!data) {
        data = generateData(10);
        cache.set(key, data);
    }

    res.send(data);
});

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log('Server started. Open http://localhost:8080/ !');
    var data = new Currencies('currenciesData', 10);

    //setInterval(data.addPoint.bind(data), 10000);
});


var Currencies = function(cacheKey, count) {
    this.key = cacheKey;
    this.nextIndex = 0;

    this.generateData(count);
};

Currencies.prototype.addPoint = function() {
    var data = this.getData(),
        point = this.generatePoint();

    data.push(point);
    cache.set(this.key, data);

    console.log('Point added ' + point.x + ':' + point.y);
};

Currencies.prototype.getData = function() {
    return cache.get(this.key);
};

Currencies.prototype.generatePoint = function(x) {
    if (!x) {
        x = this.nextIndex++;
    }

    return { x: x, y: Math.round(Math.random() * 1000) };
};

Currencies.prototype.generateData = function(count) {
    var data = [];
    for(var i = 0; i < count; i++) {
        data.push(this.generatePoint());
    }

    cache.set(this.key, data);
};