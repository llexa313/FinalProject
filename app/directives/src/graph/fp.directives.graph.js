(function(angular) {
    'use strict';

    var ns = namespace('fp.directives.graph');

    ns.controller = function ($scope, MAX_POINTS, X_AXIS_LABELS, Y_AXIS_LABELS) {
        $scope.x = {};
        $scope.y = {};
        $scope.points = [];
        $scope.labels = { x: [], y: [] };

        $scope.getY = function (y) {
            return 95 - 95 * y;
        };

        $scope.pointY = function (point) {
            return $scope.getY(point.y / $scope.y.delta);
        };

        $scope.getX = function (x) {
            return 5 + 85 * x;
        };

        $scope.pointX = function (point) {
            return $scope.getX(point.x / $scope.x.delta);
        };

        $scope.$watch('data', function (points) {
            if (_.isArray(points)) {
                if (points.length > MAX_POINTS) {
                    points = _.drop(points, points.length - MAX_POINTS);
                }

                $scope.x = {
                    min: _.minBy(points, 'x').x,
                    max: _.maxBy(points, 'x').x
                };

                $scope.y = {
                    min: _.minBy(points, 'y').y,
                    max: _.maxBy(points, 'y').y
                };

                $scope.x.delta = $scope.x.max - $scope.x.min;
                $scope.y.delta = $scope.y.max - $scope.y.min;

                points.forEach(function (p, i) {
                    var item = {
                        x: p.x - $scope.x.min,
                        y: p.y - $scope.y.min
                    };

                    if (!$scope.points[i] || i >= $scope.points.length - 1) {
                        $scope.points.splice(i, 1, item);
                    } else {
                        _.assign($scope.points[i], item);
                    }
                });
            }
        }, true);

        $scope.$watch('x', function (value) {
            if (value && value.delta != undefined) {
                var tickX = value.delta / X_AXIS_LABELS;
                for (var i = 0; i < X_AXIS_LABELS + 1; i++) {
                    var item = {
                        left: $scope.getX(i / X_AXIS_LABELS),
                        text: _.round($scope.x.min + tickX * i, 0)
                    };
                    if ($scope.labels.x[i]) {
                        _.assign($scope.labels.x[i], item);
                    } else {
                        $scope.labels.x[i] = item
                    }
                }

                if ($scope.labels.x.length) {
                    var last = $scope.labels.x[$scope.labels.x.length - 1];
                    console.log(last.text)
                }
            }
        }, true);

        $scope.$watch('y', function (value) {
            if (value && value.delta != undefined) {
                var tickY = value.delta / Y_AXIS_LABELS;
                for (var i = 0; i < Y_AXIS_LABELS + 1; i++) {
                    var item = {
                        top: $scope.getY(i / Y_AXIS_LABELS),
                        text: _.round(value.min + tickY * i, 0)
                    };
                    if ($scope.labels.y[i]) {
                        _.assign($scope.labels.y[i], item);
                    } else {
                        $scope.labels.y[i] = item
                    }
                }
            }
        }, true);
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