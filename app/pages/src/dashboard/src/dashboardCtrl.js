var ns = fp.namespace('pages.dashboard');

ns.controller = function($scope) {
    $scope.test = '$scope is working';
};

ns.$module = fp.pages.$module.controller('dashboardCtrl', [
    '$scope',
    ns.controller
]);