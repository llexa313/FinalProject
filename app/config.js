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
        $urlRouterProvider.otherwise("/sign-in");


        var defaultParams = { message: null };
        //
        // Now set up the states
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
                params: defaultParams,
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
                params: defaultParams,
                controller: 'ProfileViewCtrl'
            })
            .state('main.dashboard.editProfile', {
                url: '/profile-edit',
                templateUrl: "app/pages/src/dashboard/src/tpl/profileEdit.tpl.html",
                params: defaultParams,
                controller: 'ProfileEditCtrl'
            })
            .state('main.dashboard.graph', {
                url: '/graph',
                templateUrl: "app/pages/src/dashboard/src/tpl/graph.tpl.html",
                params: defaultParams,
                controller: 'graphCtrl'
            })
            //.state('main.profile', {
            //    url: '/profile',
            //    templateUrl: "app/pages/profile/tpl/profile.tpl.html"
            //})
            //.state('main.profile.show', {
            //    url: "/",
            //    templateUrl: "app/pages/profile/show/tpl/show.tpl.html",
            //    params: defaultParams,
            //    controller: 'ProfileShowCtrl'
            //})
            //.state('main.profile.edit', {
            //    url: "/edit",
            //    templateUrl: "app/pages/profile/edit/tpl/edit.tpl.html",
            //    params: defaultParams,
            //    controller: 'ProfileEditCtrl'
            //});

        // Now set up the states
        //$stateProvider
        //    .state('dashboard', {
        //        url: '/',
        //        templateUrl: 'app/pages/src/dashboard/src/tpl/dashboard.tpl.html',
        //        controller: 'dashboardCtrl'
        //    })
    }]);