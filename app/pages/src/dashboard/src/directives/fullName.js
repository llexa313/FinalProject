(function() {
    'use strict';

    fp.pages.profile.edit.$module.directive('fullName', function() {
        var NAME_REGEXP = /[A-Z][a-z]{2,30}\s[A-Z][a-z]{2,30}/;
        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.fullName = function(modelValue, viewValue) {
                    var value = NAME_REGEXP.exec(viewValue);
                    return !!value && value[0] === viewValue;
                };
            }
        };
    });

})();