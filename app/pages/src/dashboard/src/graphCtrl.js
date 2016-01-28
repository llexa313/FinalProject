(function() {
    'use strict';

    var ns = namespace('fp.pages.dashboard');

    ns.$module = angular.module('fp.pages.dashboard.graph', [ 'fp.services' ]);

    ns.controller = function($scope, currency) {
        this.newPointsCallback = function(event) {
            var incomingMessage = event.data,
                data = JSON.parse(incomingMessage);

            $scope.$apply(function() {
                $scope.currencies.push(data);
            });
            console.log(incomingMessage);
        };

        currency.get(this.newPointsCallback).then(function(response) {
            $scope.currencies = response.data;
        }, function() {
            //TODO exception handling
        });
    };

    fp.pages.$module.controller('graphCtrl', [
        '$scope', 'currency',
        ns.controller
    ]);
})(angular);