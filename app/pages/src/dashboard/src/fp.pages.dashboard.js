(function() {
    'use strict';

    var ns = namespace('fp.pages.dashboard');

    ns.$module = angular.module('fp.pages.dashboard', [
        'fp.services',
        'fp.pages.dashboard.graph',
        'fp.pages.dashboard.profile.view',
        'fp.pages.dashboard.profile.edit'
    ]);
})(angular);