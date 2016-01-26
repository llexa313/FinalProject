(function(angular) {
    'use strict';

    var ns = namespace('fp.directives.graph');

    ns.controller = function ($scope, MAX_POINTS, X_AXIS_LABELS, Y_AXIS_LABELS) {
        $scope.max = {};
        $scope.min = {};
        $scope.delta = {}
        $scope.points = [];
        $scope.labels = { x: [], y: [] };

        $scope.getY = function (y) {
            return 95 - 95 * y;
        };

        $scope.pointY = function (point) {
            return $scope.getY(point.y / $scope.delta.y);
        };

        $scope.getX = function (x) {
            return 5 + 85 * x;
        };

        $scope.pointX = function (point) {
            return $scope.getX(point.x / $scope.delta.x);
        };

        $scope.$watch('data', function (points) {
            if (_.isArray(points)) {
                if (points.length > MAX_POINTS) {
                    points = _.drop(points, points.length - MAX_POINTS);
                }

                $scope.min.x = _.minBy(points, 'x').x;
                $scope.min.y = _.minBy(points, 'y').y;

                $scope.max.x = _.maxBy(points, 'x').x;
                $scope.max.y = _.maxBy(points, 'y').y;

                $scope.delta.x = $scope.max.x - $scope.min.x;
                $scope.delta.y = $scope.max.y - $scope.min.y;

                points.forEach(function (p, i) {
                    var item = {
                        x: p.x - $scope.min.x,
                        y: p.y - $scope.min.y
                    };

                    if (!$scope.points[i] || i >= $scope.points.length - 1) {
                        $scope.points.splice(i, 1, item);
                    } else {
                        _.assign($scope.points[i], item);
                    }
                });
            }
        }, true);

        $scope.$watch('delta.x', function (value) {
            var tickX = value / X_AXIS_LABELS;
            for (var i = 0; i < X_AXIS_LABELS + 1; i++) {
                var item = {
                    left: $scope.getX(i / X_AXIS_LABELS),
                    text: _.round($scope.min.x + tickX * i, 0)
                };
                if ($scope.labels.x[i]) {
                    _.assign($scope.labels.x[i], item);
                } else {
                    $scope.labels.x[i] = item
                }
            }
        });

        $scope.$watch('delta.y', function (value) {
            var tickY = value / Y_AXIS_LABELS;
            for (var i = 0; i < Y_AXIS_LABELS + 1; i++) {
                var item = {
                    top: $scope.getY(i / Y_AXIS_LABELS),
                    text: _.round($scope.min.y + tickY * i, 0)
                };
                if ($scope.labels.y[i]) {
                    _.assign($scope.labels.y[i], item);
                } else {
                    $scope.labels.y[i] = item
                }
            }
        });
    };

    ns.directive = function () {
        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            controller: ['$scope', 'MAX_POINTS', 'X_AXIS_LABELS', 'Y_AXIS_LABELS', this.controller],
            templateUrl: 'app/directives/src/graph/graph.tpl.html'
        };
    };

    ns.$module = angular.module('fp.directives.graph', [])
        .directive('graph', ns.directive.bind(ns))
        .constant('MAX_POINTS', 20)
        .constant('X_AXIS_LABELS', 4)
        .constant('Y_AXIS_LABELS', 4);

})(angular);