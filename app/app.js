'use strict';

// remove $state.transitionTo
// refactoring in message show system
// add promises to user service
// fix for error push in undefined in graph
// now web socket closes
// directive can be configured
// solve issue with double directive and add it to the page
// add approximation to the start period

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
    'fp.pages'
]);