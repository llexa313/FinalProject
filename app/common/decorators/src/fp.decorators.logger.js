(function(angular) {
    "use strict";

    var ns = namespace('fp.decorators.logger');
    ns.$module = angular.module('fp.decorators.logger', [ ])
        .config([
            "$provide",
            function( $provide )
            {
                $provide.decorator( '$log', [ "$delegate", function( $delegate )
                {
                    var superFn = $delegate.log;

                    $delegate.log = function (message)
                    {
                        var time = moment().format("HH:mm:ss.SSS");
                        superFn( [ time, message].join(' - ') );
                    };

                    return $delegate;
                }]);
            }
        ]);

})(angular);