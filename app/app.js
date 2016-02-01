'use strict';

var namespace = function(namespace) {
    var parts = namespace.split('.'),
        parent = window;

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];

        if (parent[part] === undefined) {
            parent[part] = {};
        }

        parent = parent[part];
    }

    return parent;
};

namespace('fp');

fp.$module = angular.module('task3', [
    'ui.router',
    'pascalprecht.translate',
    'ngSanitize',
    'fp.services.loggerInterceptor',
    'fp.pages',
    'fp.decorators'
]);