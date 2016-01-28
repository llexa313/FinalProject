var NodeCache = require( "node-cache"),
    cache = new NodeCache();

var User = function(cacheKey) {
    this.key = cacheKey;

    this.createStatic();
};

User.prototype.getByLogin = function(login) {
    if (!login) return false;

    return cache.get(this.getHashKey(login));
};

User.prototype.getHashKey = function(login) {
    return this.key + '-' + login;
};

User.prototype.update = function(user) {
    cache.set(this.getHashKey(user.login), user);
};

User.prototype.createStatic = function(count) {
    var data = [
        {
            "login": "test",
            "password": "202cb962ac59075b964b07152d234b70",
            "name": "Alex Pupkin",
            "age": "22",
            "birthdate": "22 Apr 2001"
        },
        {
            "login": "test2",
            "password": "250cf8b51c773f3f8dc8b4be867a9a02",
            "name": "Dmitry Ivanov",
            "age": "35",
            "birthdate": "11 Jan 1973"
        }
    ];

    data.forEach(function(user) {
        cache.set(this.getHashKey(user.login), user);
    }.bind(this));
};

module.exports.User = User;