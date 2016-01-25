'use strict';

fp.$module.config(
    ['$stateProvider', '$urlRouterProvider', '$translateProvider',
    function($stateProvider, $urlRouterProvider, $translateProvider) {
        $translateProvider.useStaticFilesLoader({
            prefix: 'lang/lang-',
            suffix: '.json'
        });
        $translateProvider.preferredLanguage('en');
        $translateProvider.useSanitizeValueStrategy('escape');

        // For any unmatched url, redirect to /state1
        $urlRouterProvider.otherwise("/");

        // Now set up the states
        $stateProvider
            .state('dashboard', {
                url: '/',
                templateUrl: 'app/pages/src/dashboard/src/tpl/dashboard.tpl.html',
                controller: 'dashboardCtrl'
            })
    }]);