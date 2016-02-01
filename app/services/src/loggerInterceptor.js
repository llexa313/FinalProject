(function(angular, moment) {
    'use strict';

    var ns = namespace('fp.services.loggerInterceptor');
    ns.$module = angular.module('fp.services.loggerInterceptor', []);

    ns.factory = function($log) {
        return {
            'request': function(config) {
                config.startedAt = moment();
                return config;
            },

            'response': function(response) {
                var duration = moment.duration(moment().diff(response.config.startedAt));

                $log.log('HTTP request duration is ' + duration.asSeconds() + ' seconds');
                return response;
            },
        };
    }

    ns.$module.factory('loggerInterceptor', [
        '$log',
        ns.factory
    ]);

})(angular, moment);