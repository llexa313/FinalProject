'use strict';

var ns = fp.namespace('fp.directives.graph');

ns.controller = function($scope) {
    $scope.$watch('points', function(points, oldPoints, scope) {
        var result = []
        if (_.isArray(points)) {
            var maxX = _.maxBy(points, 'x').x,
                maxY = _.maxBy(points, 'y').y;

            points.forEach(function (point) {
                result.push({
                    x: 100 * point.x / maxX,
                    y: 100 * point.y / maxY
                });
            });
            $scope.points = result;
        }
    });
};

ns.directive = function() {
    return {
        restrict: 'E',
        scope: {
            points: '=points'
        },
        controller: ['$scope', this.controller],
        templateUrl: 'app/directives/src/graph/graph.tpl.html'
    };
};

fp.directives.$module.directive('graph', ns.directive.bind(ns));