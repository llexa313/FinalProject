'use strict';

fp.$module.config( ['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/sign-in");

    $stateProvider
        .state('main', {
            abstract: true,
            controller: 'MainCtrl',
            templateUrl: "app/pages/src/main/src/tpl/main.tpl.html"
        })
        .state('main.auth', {
            abstract: true,
            views: {
                'main' : {
                    templateUrl: "app/pages/src/auth/src/tpl/auth.tpl.html"
                }
            }

        })
        .state('main.auth.signin', {
            url: "/sign-in",
            templateUrl: "app/pages/src/auth/src/tpl/signin.tpl.html",
            params: { message: null },
            controller: 'SigninCtrl'
        })
        .state('main.auth.forgot', {
            url: "/forgot",
            templateUrl: "app/pages/src/auth/src/tpl/forgot.tpl.html",
            controller: 'ForgotCtrl'
        })
        .state('main.dashboard', {
            abstract: true,
            controller: 'dashboardCtrl',
            views: {
                'main': {
                    templateUrl: "app/pages/src/dashboard/src/tpl/dashboard.tpl.html"
                }
            }
        })
        .state('main.dashboard.viewProfile', {
            url: '/profile-view',
            templateUrl: "app/pages/src/dashboard/src/tpl/profileView.tpl.html",
            controller: 'ProfileViewCtrl'
        })
        .state('main.dashboard.editProfile', {
            url: '/profile-edit',
            templateUrl: "app/pages/src/dashboard/src/tpl/profileEdit.tpl.html",
            controller: 'ProfileEditCtrl'
        })
        .state('main.dashboard.graph', {
            url: '/graph',
            templateUrl: "app/pages/src/dashboard/src/tpl/graph.tpl.html",
            controller: 'graphCtrl'
        })
}]);