(function(angular) {
    'use strict';

    var ns = namespace('fp.directives.graph');

    ns.controller = function ($scope, CONFIG) {
        $scope.x = {};
        $scope.y = {};
        $scope.series = [
            { points: [] },
            { approximates: true, points: [] }
        ];
        $scope.labels = { x: [], y: [] };

        $scope.getY = function (y) {
            return 95 - 95 * y;
        };

        $scope.pointY = function (point) {
            return $scope.getY(point.y / $scope.y.delta);
        };

        $scope.getX = function (x) {
            return 5 + 93 * x;
        };

        $scope.pointX = function (point) {
            return $scope.getX(point.x / $scope.x.delta);
        };

        $scope.$watch('data', function (dataPoints) {
            if (_.isArray(dataPoints)) {
                var points = dataPoints,
                    dropCount = 0;
                if (points.length > CONFIG.MAX_POINTS) {
                    dropCount = points.length - CONFIG.MAX_POINTS;
                    points = _.drop(points, dropCount);
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

                var approximation = [];

                points.forEach(function (p, i) {
                    var item = {
                            x: p.x - $scope.x.min,
                            y: p.y - $scope.y.min
                        },
                        aprox = $scope.getLastAverage(dataPoints, i + dropCount, $scope.approximation);

                    if (aprox) { approximation.push(aprox); }

                    if (!$scope.series[0].points[i] || i >= $scope.series[0].points.length - 1) {
                        $scope.series[0].points.splice(i, 1, item);
                    } else {
                        _.assign($scope.series[0].points[i], item);
                    }
                });

                approximation.forEach(function(aprox, i) {
                    if (aprox) {
                        var item = {
                            x: aprox.x - $scope.x.min,
                            y: aprox.y - $scope.y.min
                        };

                        if (!$scope.series[1].points[i] || i >= $scope.series[1].points.length - 1) {
                            $scope.series[1].points.splice(i, 1, item);
                        } else {
                            _.assign($scope.series[1].points[i], item);
                        }
                    }
                });
            }
        }, true);

        $scope.$watch('x', function (value) {
            if (value && value.delta != undefined) {
                var xLabels = CONFIG.X_AXIS_LABELS;
                var tickX = value.delta / xLabels;
                for (var i = 0; i < xLabels + 1; i++) {
                    var item = {
                        left: $scope.getX(i / xLabels),
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
                }
            }
        }, true);

        $scope.$watch('y', function (value) {
            if (value && value.delta != undefined) {
                var tickY = value.delta / CONFIG.Y_AXIS_LABELS;
                for (var i = 0; i < CONFIG.Y_AXIS_LABELS + 1; i++) {
                    var item = {
                        top: $scope.getY(i / CONFIG.Y_AXIS_LABELS),
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

        $scope.getLastAverage = function(array, index, count) {
            if (_.isArray(array)) {
                var values = { x: 0, y: 0 };

                for(var i = index; i > index - count; i--) {
                    values.x += array[i].x;
                    values.y += array[i].y;

                    if (i == 0) {
                        count = 1 + index - i;
                        break;
                    }
                }

                var item = {
                    x: array[index].x,
                    y: values.y / count
                };

                return item;
            }
        };
    };

    ns.directive = function () {
        return {
            restrict: 'E',
            replace: true,
            scope: {
                data: '=',
                color: '=',
                approximation: '='
            },
            controller: ['$scope', 'CONFIG', ns.controller],
            templateUrl: 'app/directives/src/graph/graph.tpl.html'
        };
    };

    ns.$module = angular.module('fp.directives.graph', [])
        .directive('graph', ns.directive)
        .constant('CONFIG', {
            MAX_POINTS: 500,
            X_AXIS_LABELS: 4,
            Y_AXIS_LABELS: 4
        })

})(angular);