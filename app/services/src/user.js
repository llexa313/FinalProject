(function(angular) {
    'use strict';

    var ns = namespace('fp.services.user');

    ns.service = function ($http, $cacheFactory) {
        var signedIn = false,
            cache = $cacheFactory('dataCache');

        this.signIn = function (user, success, error) {
            var cacheKey = user.login + ':' + user.password,
                response = cache.get(cacheKey),
                onSuccess = function(response) {
                    if (response.success) {
                        signedIn = true;
                        success(user, response);
                    } else {
                        error('invalidPassword');
                    }
                };

            if (response) {
                onSuccess(response)
            } else {
                $http.post('/api/user/sign-in', user, { cache: true })
                    .success(function(response) {
                        cache.put(cacheKey, response);
                        onSuccess(response)
                    }).error(error);
            }
        };

        this.signOut = function () {
            document.cookie = '';
            signedIn = false;
        };

        this.isSignedIn = function () {
            return signedIn;
        };

        this.get = function (success, error) {
            $http.get('/api/user/profile').success(success).error(error);
        };

        this.forgot = function (user, success, error) {
            $http.post('/api/user/forgot', user).success(success).error(error);
        };

        this.update = function (user, success, error) {
            $http.post('/api/user/update', user).success(success).error(error);
        };
    };

    fp.services.$module.service('user', [
        '$http',
        '$cacheFactory',
        ns.service
    ]);

})(angular);