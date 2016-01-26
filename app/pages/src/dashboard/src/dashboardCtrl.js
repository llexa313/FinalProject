(function() {
    'use strict';

    var ns = namespace('fp.pages.dashboard');

    ns.controller = function($scope, currency) {
        this.newPointsCallback = function(event) {
            var incomingMessage = event.data,
                data = JSON.parse(incomingMessage);

            $scope.$apply(function() {
                $scope.currencies.push(data);
            });
        };

        currency.get(this.newPointsCallback).then(function(response) {
            $scope.currencies = response.data;
        }, function() {
            //TODO exception handling
        });
    };

    fp.pages.$module.controller('dashboardCtrl', [
        '$scope', 'currency',
        ns.controller
    ]);
})(angular);