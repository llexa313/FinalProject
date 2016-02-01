'use strict';

fp.$module.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('loggerInterceptor');
}]);