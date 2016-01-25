'use strict';

var ns = fp.namespace('services.currency');

ns.service = function($http) {
    this.get = function() {
        return $http.get('api/currencies');
    };
};

fp.services.$module.service('currency', [
    '$http',
    ns.service
]);