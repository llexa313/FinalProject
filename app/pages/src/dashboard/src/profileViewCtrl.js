(function() {
    'use strict';

    var ns = namespace('fp.pages.profile.view');

    ns.$module = angular.module('fp.pages.dashboard.profile.view', [ 'fp.services' ]);

    ns.$module.controller('ProfileViewCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        if (!user.isSignedIn()) {
            return $state.go('main.auth.signin', { message: {
                tpl: 'notAuthorized'
            }});
        }

        user.get(function(response) {
            $scope.user = response;
        }, function() {
            //TODO: add exception handling
        })
    }]);

})(angular);