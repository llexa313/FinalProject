(function() {
    'use strict';

    var ns = namespace('fp.pages');
    ns.$module = angular.module('fp.pages', [
        'fp.directives',
        'fp.services',
        'fp.pages.main',
        'fp.pages.forgot',
        'fp.pages.signin',
        'fp.pages.dashboard'
    ]);

})(angular);

