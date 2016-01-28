(function() {
    'use strict';

    fp.pages.profile.edit.$module.directive('birthdate', function() {
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        return {
            require: 'ngModel',
            link: function(scope, elm, attrs, ctrl) {
                ctrl.$validators.birthdate = function(modelValue, viewValue) {
                    if (viewValue !== undefined) {
                        var parts = viewValue.split(' '),
                            day = parts[0] * 1,
                            month = months.indexOf(parts[1]),
                            year = parts[2] * 1,
                            date = new Date(year, month, day);

                        // incorrect day
                        if (!_.isInteger(day)) {
                            return false;
                        }

                        // no such month
                        if (month == -1) {
                            return false;
                        }

                        // incorrect year
                        if (!_.isInteger(year) || !_.inRange(year, 1900, 2016)) {
                            return false;
                        }

                        // for example if day will be negative or wrong month will be changed
                        // and it means that day was wrong
                        // so if month not changed date is correct and return true
                        return date.getMonth() === month
                    }
                };
            }
        };
    });

})();