'use strict';

var express = require('express'),
    bodyParser = require("body-parser"),
    cookieParser = require('cookie-parser'),
    pause = require('connect-pause'),
    md5 = require('md5'),
    WebSocketServer = require('ws').Server,
    Data = {
        Currency: require('./data/currency').Currency,
        User: require('./data/user').User
    };

var app = express(),
    clients = {},
    PAUSE_DELAY = 1000,
    sessions = {},
    wss = new WebSocketServer({ port: 8081 }),
    currency = new Data.Currency('currenciesData', 10),
    users = new Data.User('user');


// configuration =================
app.use(bodyParser.json());
app.use(cookieParser());

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
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.send(currency.getData());
});

app.post('/api/user/sign-in', pause(PAUSE_DELAY), function (req, res) {
    var login = req.body.login,
        password = req.body.password,
        user = users.getByLogin(login),
        sessionId;

    if (user && user.password === md5(password)) {
        sessionId = Math.random() * Number.MAX_SAFE_INTEGER;
        sessions[sessionId] = login;
        user.sessionId = sessionId;
        users.update(user);
        res.cookie('session-id', sessionId);
    }

    res.send({ success: !!sessionId });
});


app.post('/api/user/forgot', pause(PAUSE_DELAY), function(req, res) {
    var newPassword = Math.round(Math.random() * 100000000).toString(),
        login = req.body.login,
        user = users.getByLogin(login);

    if (user) {
        user.password = md5(newPassword);
        users.update(user);

        res.send({
            success: true,
            newPassword: newPassword
        });
    } else {
        res.send({
            success: false
        })
    }
});

app.get('/api/user/profile', pause(PAUSE_DELAY), function(req, res) {
    var login = sessions[req.cookies['session-id']],
        user = users.getByLogin(login);

    if (user) {
        res.send({
            name: user.name,
            age: user.age,
            birthdate: user.birthdate
        });
    } else {
        res.send({ success: false });
    }
});

app.post('/api/user/update', pause(PAUSE_DELAY), function(req, res) {
    var login = sessions[req.cookies['session-id']],
        user = users.getByLogin(login),
        params = req.body;

    if (user) {
        user.name = params.name;
        user.age = params.age;
        user.birthdate = params.birthdate;
        users.update(user);
        res.send({ success: true });
    } else {
        res.send({ success: false });
    }
});

// listen (start app with node server.js) ======================================
app.listen(8080, function () {
    console.log('Server started. Open http://localhost:8080/ !');

    setInterval(function() {
        wss.broadcast(JSON.stringify(currency.addPoint()));
    }, 5000);
});