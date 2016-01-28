(function() {
    'use strict';

    var ns = namespace('fp.pages.signin');
    ns.$module = angular.module('fp.pages.signin', [ 'fp.services' ]);

    ns.$module.controller('SigninCtrl', ['$scope', 'user', '$state', function($scope, user, $state) {
        $scope.user = {};

        $scope.login = function() {
            user.signIn($scope.user, function(){
                $state.go('main.dashboard.viewProfile');
            }, function(e) {
                $state.transitionTo($state.current, { message: {
                    tpl: e
                }});
            });
        };
    }]);

})(angular);