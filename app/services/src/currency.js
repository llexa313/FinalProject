(function(angular) {
    'use strict';

    var ns = namespace('fp.services.currency');

    ns.service = function($http) {
        // craete web socket connection
        var socket = new WebSocket("ws://localhost:8081");

        this.get = function(newPointsCallback) {
            socket.onmessage = newPointsCallback;
            return $http.get('api/currencies');
        };
    };

    fp.services.$module.service('currency', [
        '$http',
        ns.service
    ]);

})(angular);