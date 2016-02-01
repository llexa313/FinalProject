(function(angular) {
    'use strict';

    var ns = namespace('fp.services.user');
    ns.$module = angular.module('fp.services.user', []);

    ns.service = function ($http) {
        var signedIn = false;

        this.signIn = function (user) {
            return $http.post('/api/user/sign-in', user, { cache: true })
                    .then(
                        function(response) {
                            signedIn = true;
                            return response;
                        }
                    );
        };

        this.signOut = function () {
            document.cookie = '';
            signedIn = false;
        };

        this.isSignedIn = function () {
            return signedIn;
        };

        this.get = function () {
            return $http.get('/api/user/profile');
        };

        this.forgot = function (user) {
            return $http.post('/api/user/forgot', user);
        };

        this.update = function (user) {
            return $http.post('/api/user/update', user);
        };
    };

    ns.$module.service('user', [
        '$http',
        ns.service
    ]);

})(angular);