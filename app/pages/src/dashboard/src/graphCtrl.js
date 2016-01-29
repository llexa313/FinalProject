(function() {
    'use strict';

    var ns = namespace('fp.pages.dashboard');

    ns.$module = angular.module('fp.pages.dashboard.graph', [ 'fp.services' ]);

    ns.controller = function($scope, currency, user, $state) {
        //if (!user.isSignedIn()) {
        //    return $state.go('main.auth.signin', { message: {
        //        tpl: 'notAuthorized'
        //    }});
        //}

        this.newPointsCallback = function(event) {
            console.log('ws event');

            var incomingMessage = event.data,
                data = JSON.parse(incomingMessage);

            $scope.$apply(function() {
                if ($scope.currencies) {
                    $scope.currencies.push(data);
                }
            });
        };

        currency.get(this.newPointsCallback).then(function(response) {
            $scope.currencies = response.data;
        }, function() {
            //TODO exception handling
        });


        $scope.$on('$destroy', function() {
            currency.closeWS();
        });
    };

    fp.pages.$module.controller('graphCtrl', [
        '$scope', 'currency', 'user', '$state',
        ns.controller
    ]);
})(angular);