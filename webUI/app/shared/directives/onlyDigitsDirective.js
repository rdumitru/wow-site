(function () {
    'use strict';

    angular.module('app.directives').directive('onlyDigits', OnlyDigitsDirective);

    OnlyDigitsDirective.$inject = ['logger'];

    function OnlyDigitsDirective(logger) {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: link
        };

        function link(scope, element, attrs, modelCtrl) {
            logger.debug(OnlyDigitsDirective, link, 'Configuring.');

            modelCtrl.$parsers.push(function (inputValue) {
                if (inputValue == undefined) return '';

                var transformedInput = inputValue.replace(/[^0-9]/g, '');
                if (transformedInput != inputValue) {
                    modelCtrl.$setViewValue(transformedInput);
                    modelCtrl.$render();
                }

                return transformedInput;
            });
        }
    }
})();
