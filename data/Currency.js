var NodeCache = require( "node-cache"),
    cache = new NodeCache();

var Currency = function(cacheKey, count) {
    this.key = cacheKey;
    this.nextIndex = 0;

    this.generateData(count);
};

Currency.prototype.addPoint = function() {
    var data = this.getData(),
        point = this.generatePoint();

    data.push(point);
    cache.set(this.key, data);

    return point;
};

Currency.prototype.getData = function() {
    return cache.get(this.key);
};

Currency.prototype.generatePoint = function(x) {
    if (!x) {
        x = this.nextIndex++;
    }

    return { x: x, y: Math.round(Math.random() * 1000) };
};

Currency.prototype.generateData = function(count) {
    var data = [];
    for(var i = 0; i < count; i++) {
        data.push(this.generatePoint());
    }

    cache.set(this.key, data);
};

module.exports.Currency = Currency;