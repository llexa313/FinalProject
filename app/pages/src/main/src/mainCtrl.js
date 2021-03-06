(function(angular) {
    'use strict';

    var ns = namespace('fp.pages.main');
    ns.$module = angular.module('fp.pages.main', [
        'fp.services.user'

    ]);

    ns.$module.controller('MainCtrl', [
        '$rootScope', '$scope', '$timeout', '$state', 'user', '$translate', '$http', '$log',
        function($rootScope, $scope, $timeout, $state, user, $translate, $http, $log) {
            var promise;

            $scope.lang = $translate.preferredLanguage();

            $scope.switchLang = function(lang) {
                $scope.lang = lang;
                $translate.use(lang);
            };

            $scope.isHttpPending = function () {
                //TODO переделать
                return $http.pendingRequests.length > 0;
            };

            $scope.isSigned = function() {
                return user.isSignedIn();
            };

            $scope.signOut = function() {
                user.signOut();
                return $state.go('main.sign-out');
            };

            $scope.setMessage = function(m) {
                $translate('common.messages.' + m.tpl, m.params).then(function (translation) {
                    $scope.message = translation;
                });
            };

            $rootScope.$on('$stateChangeSuccess', function(e, state, params) {
                $scope.message = '';

                if (params && params.message) {
                    $scope.setMessage(params.message);
                }

                if ($scope.isSigned()) {
                    if (promise) {
                        $timeout.cancel(promise);
                    }

                    //promise = $timeout(function () {
                    //    user.signOut();
                    //    $state.go('main.sign-out', { message: {
                    //        tpl: 'sessionTimeout'
                    //    }});
                    //}, 5000);
                }
            });
        }]);

})(angular);