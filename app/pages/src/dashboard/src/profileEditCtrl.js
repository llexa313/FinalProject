(function() {
    'use strict';

    var ns = namespace('fp.pages.profile.edit');

    ns.$module = angular.module('fp.pages.dashboard.profile.edit', [ 'fp.services' ]);

    ns.$module.controller('ProfileEditCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        var loadedUser;
        if (!user.isSignedIn()) {
            return $state.go('main.auth.signin', { message: {
                tpl: 'notAuthorized'
            }});
        }

        user.get().then(function(response) {
            $scope.user = response.data;
            loadedUser = response.data;
        }, function() {
            //TODO: add exception handling
        });

        $scope.reset = function(form) {
            form && form.$setPristine();
        };
        $scope.submit = function() {
            user.update($scope.user).then(function() {
                $state.go('^.viewProfile', { message: {
                    tpl: 'profileUpdated'
                }});
            }, function() {
                //TODO: add exception handling
            })
        };
    }]);

})(angular);