//- implement own interceptors (http service’s interceptor for logging how much time we spend for different requests)
//- add new module to decorate logging (string into decorator have to be “{0} {1} – {2}{3}“ where {0} current date – “dd-MMM-yyyy”, {1} – current time – “HH:MM:SS:MS”, {2} – class name, {3} – string that need to log)
//- you need log all necessary actions

(function(angular) {
    'use strict';

    var ns = namespace('fp.interceptors.logger');
    ns.$module = angular.module('fp.interceptors.logger', [
        '$httpProvider',
        function($httpProvider) {
            $httpProvider.interceptors.push(function($q, dependency1, dependency2) {
                return {
                    'request': function(config) {
                        console.log('req');
                        return config;
                    },

                    'response': function(response) {
                        console.log('res');
                        return response;
                    }
                };
            });
        }
    ]);


})(angular);