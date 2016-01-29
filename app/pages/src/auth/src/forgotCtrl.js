(function(angular) {
    'use strict';

    var ns = namespace('fp.pages.forgot');
    ns.$module = angular.module('fp.pages.forgot', [ 'fp.services' ]);

    ns.$module.controller('ForgotCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        $scope.user = { login: '' };

        $scope.submit = function() {
            user.forgot($scope.user).then(function (response) {

                if (response && response.data && response.data.success) {
                    $state.go('^.signin', {
                        message: {
                            tpl: 'passwordSent',
                            params: { newPassword: response.data.newPassword }
                        }
                    });
                } else {
                    $scope.setMessage({ tpl: 'noSuchUser' });
                }
            }, function () {
                //TODO: add exception handling
            })
        }
    }]);

})(angular);