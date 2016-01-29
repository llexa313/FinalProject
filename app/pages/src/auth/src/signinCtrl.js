(function() {
    'use strict';

    var ns = namespace('fp.pages.signin');
    ns.$module = angular.module('fp.pages.signin', [ 'fp.services' ]);

    ns.$module.controller('SigninCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        $scope.user = {};

        $scope.login = function() {
            var reject =  function(e) {
                $scope.setMessage({ tpl: 'invalidPassword' });
            };

            user.signIn($scope.user).then(
                function(response) {
                    if (response && response.data && response.data.success) {
                        $state.go('main.dashboard.viewProfile');
                    } else {
                        reject();
                    }
                },
                reject);
        };
    }]);

})(angular);