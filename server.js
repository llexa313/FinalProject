'use strict';

var express = require('express'),
    WebSocketServer = require('ws').Server,
    Data = {
        Currency: require('./data/currency').Currency
    };

var app = express(),
    clients = {},
    wss = new WebSocketServer({ port: 8081 }),
    currency = new Data.Currency('currenciesData', 10);

wss.on('connection', function(ws) {
    var id = Math.random();
    clients[id] = ws;
    console.log("новое соединение " + id);

    ws.on('message', function(message) {
        console.log('получено сообщение ' + message);

        for (var key in clients) {
            clients[key].send(message);
        }
    });

    ws.on('close', function() {
        console.log('соединение закрыто ' + id);
        delete clients[id];
    });
});

wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        client.send(data);
    });
};

// set the static files location /
app.use('/', express.static('./public'));
app.use('/components', express.static('./bower_components'));
app.use('/app', express.static('app'));
app.use('/lang', express.static('./lang'));

app.get('/api/currencies', function(req, res) {
    res.send(currency.getData());
});

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log('Server started. Open http://localhost:8080/ !');

    setInterval(function() {
        wss.broadcast(JSON.stringify(currency.addPoint()));
    }, 5000);
});