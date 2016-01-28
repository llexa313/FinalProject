(function(angular) {
    'use strict';

    var ns = namespace('fp.pages.forgot');
    ns.$module = angular.module('fp.pages.forgot', [ 'fp.services' ]);

    ns.$module.controller('ForgotCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        $scope.user = { login: '' };

        $scope.submit = function() {
            user.forgot($scope.user, function (response) {
                $state.go('^.signin', {
                    message: {
                        tpl: 'passwordSent',
                        params: { newPassword: response.newPassword }
                    }});
            }, function () {
                //TODO: add exception handling
            })
        }
    }]);

})(angular);