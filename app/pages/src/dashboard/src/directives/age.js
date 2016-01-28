(function() {
    'use strict';

    fp.pages.profile.edit.$module.directive('age', function() {
        var INTEGER_REGEXP = /^\-?\d+$/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.age = function(modelValue, viewValue) {
                    var value = INTEGER_REGEXP.exec(viewValue);
                    return !!(value && value[0] && _.inRange(value, 18, 60));
                };
            }
        };
    });

})();