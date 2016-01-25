'use strict';

var FinalProject = function() {
    this.$module = angular.module('task3', [
        'ui.router',
        'pascalprecht.translate',
        'ngSanitize',
        'fp.services',
        'fp.pages'
    ]);
};

FinalProject.prototype.namespace = function(namespace) {
    var parts = namespace.split('.'),
        parent = this;

    for (var i = 0; i < parts.length; i++) {
        var part = parts[i];

        if (parent[part] === undefined) {
            parent[part] = {};
        }

        parent = parent[part];
    }

    return parent;
};

var fp = new FinalProject();