(function(angular) {
    'use strict';

    var ns = namespace('fp.services.currency');
    ns.$module = angular.module('fp.services.currency', [ ]);

    ns.service = function($http) {
        var socket;

        this.get = function(newPointsCallback) {
            socket = new WebSocket("ws://localhost:8081");

            return $http.get('api/currencies').then(function(r) {
                socket.onmessage = newPointsCallback;
                return r;
            });
        };

        this.closeWS = function() {
            socket && socket.close();
        }
    };

    ns.$module.service('currency', [
        '$http',
        ns.service
    ]);

})(angular);