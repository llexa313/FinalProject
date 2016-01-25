'use strict';
var ns = fp.namespace('pages.dashboard');

ns.controller = function($scope, currency) {
    currency.get().then(function(response) {
        $scope.currencies = response.data;
    }, function() {
        //TODO exception handling
    });
};

fp.pages.$module.controller('dashboardCtrl', [
    '$scope', 'currency',
    ns.controller
]);