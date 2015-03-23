(function () {
    'use strict';

    angular.module('app.directives').directive('onlyDigits', OnlyDigitsDirective);

    OnlyDigitsDirective.$inject = ['logger'];

    function OnlyDigitsDirective(logger) {
        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attrs, ctrl) {
            // TODO: finish writing this directive.
            logger.debug(OnlyDigitsDirective, link, 'Configuring.');
        }
    }
})();
