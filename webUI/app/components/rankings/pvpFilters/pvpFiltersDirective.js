(function () {
    'use strict';

    angular.module('app.rankings').directive('pvpFilters', PvpFiltersDirective);

    PvpFiltersDirective.$inject = ['logger'];

    function PvpFiltersDirective(logger) {
        return {
            restrict: 'E',
            templateUrl: '/app/components/rankings/pvpFilters/pvpFiltersTemplate.html',
            replace: true,
            controller: 'PvpFiltersController',
            controllerAs: 'vm',
            bindToController: true,
            scope: {

            },
            link: link
        };

        function link(scope, element, attrs, ctrl) {
            logger.debug(PvpFiltersDirective, link, 'Configuring.');
        }
    }
})();